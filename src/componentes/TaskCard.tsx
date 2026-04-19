/*
import { Task } from "../App";


interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskCard({ task, onDelete, onToggle }: Props) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(task.id)}>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>X</button>
    </div>
  );
}
  */
 import { useState } from "react";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    if (text.trim() === "") return;
    onEdit(task.id, text);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(task.id)}>
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>X</button>
        </>
      )}
    </div>
  );
}