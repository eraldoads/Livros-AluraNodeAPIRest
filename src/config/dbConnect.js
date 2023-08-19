import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:alura2023@alura.uqfhw7n.mongodb.net/alura-nodeJs");

let db = mongoose.connection;

export default db;