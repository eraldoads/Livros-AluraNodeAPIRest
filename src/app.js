import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log('Conexão com o bando de dados feita com sucesso')
});

const app = express();

app.use(express.json());

routes(app);

/// [Inicio] -> 2ª aula do curso
// const livros = [
//     {id: 1, "titulo": "Senhor dos Aneis"},
//     {id: 2, "titulo": "O Hobbit"}
// ];
//
// app.get('/livros', (req, res) => {
//    res.status(200).json(livros);
// });
//
// app.get('/livros/:id', (req, res) => {
//     let index = BuscaLivro(req.params.id);
//     res.json(livros[index]);
// });
/// [Fim]

/// [Inicio] -> 3ª aula do curso
// // A nova versão do Mongoose não aceita retornos por callback, sendo assim é aconselhado pelos desenvolvedores da lib o uso de async/await.
// // Para isso foi preciso alterar o método GET
// app.get('/livros', async (req, res) => {
//     try {
//         const livrosResultado = await livros.find();
//         res.status(200).json(livrosResultado);
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).json({ error: 'Erro ao resgatar o livro' });
//     };
// });
//
// app.get('/livros/:id', async (req, res) => {
//     try {
//         // busca o livro pelo id usando o modelo do Mongoose
//         let livro = await livros.findById(req.params.id);
//         // verifica se encontrou o livro
//         if (livro) {
//             // envia o livro como resposta em formato JSON
//             res.json(livro);
//         } else {
//             // envia uma mensagem de erro se não encontrou o livro
//             res.status(404).json({ error: 'Livro não encontrado' });
//         }
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         res.status(500).json({ error: 'Erro ao resgatar o livro' });
//     }
// });
//
// app.post('/livros', (req, res) => {
//     livros.push(req.body);
//     res.status(201).send('Livro foi cadastrado com sucesso');
// });
// app.put('/livros/:id', (req, res) => {
//     let index = BuscaLivro(req.params.id);
//     livros[index].titulo = req.body.titulo;
//     res.json(livros);
// });
//
// app.delete('/livros/:id', (req, res) => {
//     let {id} = req.params;
//     let index = BuscaLivro(id);
//     livros.splice(index, 1);
//     res.send(`Livro ${id} removido com sucesso`);
// });
//
// function BuscaLivro(id){
//     return livros.findIndex(livros => livros.id == id);
// };
/// [Fim]

export default app;