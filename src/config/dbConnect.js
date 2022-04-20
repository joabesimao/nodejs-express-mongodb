import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://simaoJoabe:123@cluster0.a3iae.mongodb.net/node-alura?retryWrites=true&w=majority"
);

let db = mongoose.connection;

export default db;
