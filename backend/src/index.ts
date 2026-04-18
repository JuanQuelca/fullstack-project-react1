const express = require("express");
// const cors = require("cors"); habilitamos
const cors = require("cors");
// habilitamos CORS para permitir solicitudes desde el frontend

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors()); 

let tasks = [
  
  { id: 1, text: 'Study express', completed: false },
  { id: 2, text: 'Build backend', completed: true },
];
app.get("/", (req: any, res: any)=>{
    res.send("Backend is working!");
});
app.get("/tasks", (req: any, res: any)=>{
    res.json(tasks);
});


app.post("/tasks", (req: any, res: any)=>{
    console.log("POST /tasks FUE LLAMADO");
    console.log("Datos recibidos:", req.body);

    const newTask = {
        id:req.body.id,
        text:req.body.text,
        completed:req.body.completed
    };
    tasks.push(newTask);
    console.log("lista actualizada:", tasks);

    res.json(newTask);
});
//delete task
app.delete("/tasks/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Deleted" });
});
//toggle task
app.put("/tasks/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id);

  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  res.json({ message: "Updated" });
});
// modify task
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});