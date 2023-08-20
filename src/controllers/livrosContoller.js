import livros from "../models/Livro.js";

class LivroController {
    // A nova versão do Mongoose não aceita retornos por callback, sendo assim é aconselhado pelos desenvolvedores da lib o uso de async/await.
    // Para isso foi preciso alterar o método.
    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate('autor').exec();
            res.status(200).json(livrosResultado);
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Erro ao resgatar o livro' });
        };
    };

    static listarLivroPorId = async (req, res) => {
        try {
            // busca o livro pelo id usando o modelo do Mongoose
            let livro = await livros.findById(req.params.id).populate('autor', 'nome').exec();
            // verifica se encontrou o livro
            if (livro) {
                // envia o livro como resposta em formato JSON
                res.json(livro);
            } else {
                // envia uma mensagem de erro se não encontrou o livro
                res.status(404).json({ error: 'Livro não encontrado' });
            };
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Erro ao resgatar o livro' });
        };
    };

    static cadastrarLivro = async (req, res) => {
        try {
          // cria um novo livro com os dados da requisição
          let livro = new livros(req.body);
          // salva o livro no banco de dados e espera pela resolução da promessa
          let resultado = await livro.save();
          // envia o livro salvo como resposta em formato JSON
          res.status(201).send(resultado.toJSON());
        } catch (err) {
          // envia uma mensagem de erro se ocorrer algum problema na operação save
          res.status(500).send({message: `${err.message} - falha ao cadastrar o livro.`})
        }
    };

    static alterarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            let livro = await livros.findById(req.params.id);

            // verifica se encontrou o livro
            if (livro) {
                // Atualiza o livro
                await livros.findByIdAndUpdate(id, {$set: req.body});
                res.status(200).send({message: 'Livro atualizado.'});
            } else {
                // envia uma mensagem de erro se não encontrou o livro
                res.status(404).json({ error: 'Livro não encontrado' });
            };

        } catch (error) {
            res.status(500).send({message: error.message});
        };
    };

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            let livro = await livros.findById(req.params.id);

            // verifica se encontrou o livro
            if (livro) {
                // Atualiza o livro
                await livros.findByIdAndDelete(id);
                res.status(200).send({message: 'Livro removido.'});
            } else {
                // envia uma mensagem de erro se não encontrou o livro
                res.status(404).json({ error: 'Livro não encontrado' });
            };

        } catch (error) {
            res.status(500).send({message: error.message});
        };
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
          // obtém a editora da requisição
          const editora = req.query.editora;
          // faz a consulta ao banco de dados usando o modelo livros e armazena o resultado em uma variável
          const resultado = await livros.find({'editora': editora}, {});
          // envia o resultado como resposta em formato JSON
          res.status(200).send(resultado);
        } catch (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Erro ao resgatar a Editora.' });
        };
      };
};

export default LivroController;