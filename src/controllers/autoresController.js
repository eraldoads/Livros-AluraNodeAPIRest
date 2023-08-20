import autores from "../models/Autor.js";

class AutorController {
    // A nova versão do Mongoose não aceita retornos por callback, sendo assim é aconselhado pelos desenvolvedores da lib o uso de async/await.
    // Para isso foi preciso alterar o método.
    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Erro ao resgatar o autor' });
        };
    };

    static listarAutorPorId = async (req, res) => {
        try {
            // busca o autor pelo id usando o modelo do Mongoose
            let autor = await autores.findById(req.params.id);
            // verifica se encontrou o autor
            if (autor) {
                // envia o autor como resposta em formato JSON
                res.json(autor);
            } else {
                // envia uma mensagem de erro se não encontrou o autor
                res.status(404).json({ error: 'Autor não encontrado' });
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Erro ao resgatar o autor' });
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
          // cria um novo autor com os dados da requisição
          let autor = new autores(req.body);
          // salva o autor no banco de dados e espera pela resolução da promessa
          let resultado = await autor.save();
          // envia o autor salvo como resposta em formato JSON
          res.status(201).send(resultado.toJSON());
        } catch (err) {
          // envia uma mensagem de erro se ocorrer algum problema na operação save
          res.status(500).send({message: `${err.message} - falha ao cadastrar o autor.`})
        }
    }

    static alterarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            let autor = await autores.findById(req.params.id);

            // verifica se encontrou o autor
            if (autor) {
                // Atualiza o autor
                await autores.findByIdAndUpdate(id, {$set: req.body});
                res.status(200).send({message: 'Autor atualizado.'});
            } else {
                // envia uma mensagem de erro se não encontrou o autor
                res.status(404).json({ error: 'Autor não encontrado' });
            }

        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    static excluirAutor = async (req, res) => {
        try {

            const id = req.params.id;
            let autor = await autores.findById(req.params.id);

            // verifica se encontrou o autor
            if (autor) {
                // Atualiza o autor
                await autores.findByIdAndDelete(id);
                res.status(200).send({message: 'Autor removido.'});
            } else {
                // envia uma mensagem de erro se não encontrou o autor
                res.status(404).json({ error: 'Autor não encontrado' });
            }

        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
};

export default AutorController;