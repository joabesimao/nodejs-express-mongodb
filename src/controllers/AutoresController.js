import autores from "../models/Autor.js";
import Autor from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((erro, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id, (erro, autores) => {
      if (erro) {
        res
          .status(400)
          .send({ message: `${erro.message} id do autores não localizado` });
      } else {
        res.status(200).send(autores);
      }
    });
  };

  static cadastrarAutor = (req, res) => {
    let autores = new Autor(req.body);

    autores.save((erro) => {
      if (erro) {
        res
          .status(500)
          .send({ message: `${erro.message} falha ao cadastrar o autores.` });
      } else {
        res.status(201).send(autores.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, { $set: req.body }, (erro) => {
      if (!erro) {
        res.status(200).send({ message: "autores atualizado com sucesso" });
      } else {
        res.status(500).send({ message: erro.message });
      }
    });
  };

  static excluirAutor = (req, res) => {
    const id = req.params.id;
    autores.findByIdAndDelete(id, (erro) => {
      if (!erro) {
        res.status(200).send({ message: "autores removido com sucesso" });
      } else {
        res.status(500).send({ message: erro.message });
      }
    });
  };
}

export default AutorController;
