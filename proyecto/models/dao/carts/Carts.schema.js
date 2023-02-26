import mongoose from "mongoose" 

const ItemCartSchema = new mongoose.Schema({
  "_id": { type: String, require: true }, 
  "nameItem": { type: String, require: true }, 
  "imageItem": { type: String, require: true }, 
  "costItem": { type: Number, require: true },
  "qtyItem": { type: Number, require: true }
})

const CartSchema = new mongoose.Schema({
      "products": { type: [ItemCartSchema], require: true },
      "timestamp": { type: Date, default: Date.now }
    })

 
export default {CartSchema,ItemCartSchema};