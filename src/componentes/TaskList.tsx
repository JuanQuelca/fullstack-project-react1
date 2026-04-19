// src/components/TaskList.tsx
import { Task } from "../App";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void; // 👈 AGREGAR
}

export default function TaskList({ tasks, onDelete, onToggle, onEdit }: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}