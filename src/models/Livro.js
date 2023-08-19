import mongoose from "mongoose";

const Schema = mongoose.Schema;

const livroSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId},
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    editora: {type: String, required: true},
    numeroPaginas: {type: Number}
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;