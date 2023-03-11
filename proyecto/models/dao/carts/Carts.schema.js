import mongoose from "mongoose" 

const ItemCartSchema = new mongoose.Schema({
  "_id": { type: String, require: true },  
  "qtyItem": { type: Number, require: true }
})

const CartSchema = new mongoose.Schema({
      "username" : { type: String, require: true }, 
      "products": { type: [ItemCartSchema], require: true },
      "timestamp": { type: Date, default: Date.now }
    })

 
export default {CartSchema,ItemCartSchema};