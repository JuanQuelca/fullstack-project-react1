type Request = import("express").Request;
type Response = import("express").Response;
const SECRET_KEY = "mi_clave_secreta";

const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
//const PORT = 3000;
const PORT = process.env.PORT || 3000;
/*
app.use(cors());
app.use(express.json());
*/
app.use(cors({
  origin: "https://fullstack-project-react1-dnw8.vercel.app/"
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working!");
});
//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validación básica
  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generar token
  const token = jwt.sign(
    { username: username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

//***** */

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

//verifytoken
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // header
  if (!authHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  //
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // opcional: guardar usuario
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
//***** */
// ruta protegida
app.get("/private", verifyToken, (req, res) => {
  res.json({ message: "Acceso permitido" });
});

/*
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});