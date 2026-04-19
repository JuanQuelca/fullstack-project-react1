type Request = import("express").Request;
type Response = import("express").Response;

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working!");
});

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: { id: "desc" },
  });
  res.json(tasks);
});

app.post("/tasks", async (req: Request, res: Response) => {
  const { text } = req.body;

  const newTask = await prisma.task.create({
    data: { text, completed: false },
  });

  res.json(newTask);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  await prisma.task.delete({
    where: { id },
  });

  res.json({ message: "Deleted" });
});

/*
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  const task = await prisma.task.findUnique({
    where: { id },
  });

  const updated = await prisma.task.update({
    where: { id },
    data: { completed: !task?.completed },
  });

  res.json(updated);
});
*/
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { text, completed } = req.body;

  const updated = await prisma.task.update({
    where: { id },
    data: {
      text,
      completed,
    },
  });

  res.json(updated);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});