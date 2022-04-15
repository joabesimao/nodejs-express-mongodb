import express from "express";

const app = express();

const livros = [
  { id: 1, titulo: "Senhor dos aneis" },
  { id: 2, titulo: "O hobiit" },
];

app.get("/", (req, res) => {
  res.status(200).send("curso de node");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

export default app;
