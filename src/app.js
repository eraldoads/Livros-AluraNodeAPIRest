import express from "express";

const app = express();

app.use(express.json());

const livros = [
    {id: 1, "titulo": "Senhor dos Aneis"},
    {id: 2, "titulo": "O Hobbit"}
];

app.get('/', (req, res) => {
    res.status(200).send('Curso de NodeJS');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    let index = BuscaLivro(req.params.id);
    res.json(livros[index]);
  })

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso');
})

app.put('/livros/:id', (req, res) => {
    let index = BuscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = BuscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} removido com sucesso`);
})

function BuscaLivro(id){
    return livros.findIndex(livros => livros.id == id);
}

export default app;