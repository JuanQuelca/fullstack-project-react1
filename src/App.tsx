import { useState, useEffect } from "react";
import Header from "./componentes/Header";

import TaskInput from "./componentes/TaskInput";
import TaskList from "./componentes/TaskList";
import Footer from "./componentes/Footer";
import EmptyState from "./componentes/EmptyState";
import "./index.css";

//const API_URL = "http://localhost:3000";

const API_URL = import.meta.env.VITE_API_URL;
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  const data = await res.json();
  setTasks(data);
};

  //conectrar con el backend
useEffect(() => {
  fetchTasks();
}, []);

//********* */
 // agregar
  const addTask = async (text: string) => {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    fetchTasks();
  };

  //  eliminar
  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // toggle
  const toggleTask = async (id: number) => {
    //const task = tasks.find((t: any) => t.id === id);
    const task = tasks.find((t) => t.id === id);

    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task?.text,
        completed: !task?.completed,
      }),
    });

    fetchTasks();
  };

  // editar
  const editTask = async (id: number, newText: string) => {
    const task = tasks.find((t: any) => t.id === id);

    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newText,
        completed: task?.completed,
      }),
    });

    fetchTasks();
  };

//******** */

  return (
    <div className="app">
      <div className="card">
        <Header />
        <TaskInput onAdd={addTask} />

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
          />
        )}

        <Footer tasks={tasks} />
      </div>
    </div>
  );
}
