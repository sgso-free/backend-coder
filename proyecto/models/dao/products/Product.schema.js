import mongoose from "mongoose"


const ProductSchema = new mongoose.Schema({
    "nombre": { type: String, require: true },
    "descripcion": { type: String, require: true },
    "codigo": { type: String, require: true },
    "foto": { type: String, require: true },
    "precio": { type: Number, require: true },
    "stock": { type: Number, require: true },
    "categoria": { type: Number, require: true },
    "timestamp": { type: Date, default: Date.now },
  })

  export default ProductSchema;