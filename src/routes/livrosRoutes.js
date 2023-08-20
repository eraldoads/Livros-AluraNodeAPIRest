import express from "express";
import LivroController from "../controllers/livrosContoller.js";

const router = express.Router();

router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.listarLivroPorEditora)
    .get("/livros/:id", LivroController.listarLivroPorId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.alterarLivro)
    .delete("/livros/:id", LivroController.excluirLivro)

export default router;