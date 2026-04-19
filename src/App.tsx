import { useState, useEffect } from "react";
import Header from "./componentes/Header";

import TaskInput from "./componentes/TaskInput";
import TaskList from "./componentes/TaskList";
import Footer from "./componentes/Footer";
import EmptyState from "./componentes/EmptyState";
import "./index.css";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  //conectrar con el backend
  useEffect(() => {
  fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data));
}, []);
// backend connection

  const addTask = async (text: string) => {
  const newTask = {
    //id: Date.now(),
    text,
    completed: false,
  };

  const res = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  const data = await res.json();
  setTasks([data, ...tasks]);
};

 const deleteTask = async (id: number) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });

  setTasks(tasks.filter((task) => task.id !== id));
};

//toogle task
const toggleTask = async (id: number) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
  });

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

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
          />
        )}

        <Footer tasks={tasks} />
      </div>
    </div>
  );
}


