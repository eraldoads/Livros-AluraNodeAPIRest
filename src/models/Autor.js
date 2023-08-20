import mongoose from "mongoose";

const Schema = mongoose.Schema;

const livroSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId},
    nome: {type: String, required: true},
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model('autores', livroSchema);

export default autores;