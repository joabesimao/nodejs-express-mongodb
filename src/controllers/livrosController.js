import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("Autor")
      .exec((erro, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((erro, livros) => {
        if (erro) {
          res
            .status(400)
            .send({ message: `${erro.message} id do livro não localizado` });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((erro) => {
      if (erro) {
        res
          .status(500)
          .send({ message: `${erro.message} falha ao cadastrar o livro.` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (erro) => {
      if (!erro) {
        res.status(200).send({ message: "livro atualizado com sucesso" });
      } else {
        res.status(500).send({ message: erro.message });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (erro) => {
      if (!erro) {
        res.status(200).send({ message: "livro removido com sucesso" });
      } else {
        res.status(500).send({ message: erro.message });
      }
    });
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;

    livros.find({ editora: editora }, {}, (erro, livros) => {
      res.status(200).send(livros);
    });
  };
}

export default LivroController;
