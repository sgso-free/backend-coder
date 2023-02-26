import mongoose from "mongoose" 

const OrderSchema = new mongoose.Schema({
      "username": { type: String, require: true },
      "items": { type: [ItemOrderSchema], require: true },
      "timestamp": { type: Date, default: Date.now }
    })

const ItemOrderSchema = new mongoose.Schema({
    "idItem": { type: String, require: true }, 
    "nameItem": { type: String, require: true }, 
    "costItem": { type: Number, require: true },
    "qtyItem": { type: Number, require: true }
})

export default {OrderSchema, ItemOrderSchema};