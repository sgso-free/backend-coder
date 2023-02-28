import mongoose from "mongoose" 

const ItemOrderSchema = new mongoose.Schema({
  "_id": { type: String, require: true }, 
  "nameItem": { type: String, require: true }, 
  "imageItem": { type: String, require: true }, 
  "costItem": { type: Number, require: true },
  "qtyItem": { type: Number, require: true }
})

const OrderSchema = new mongoose.Schema({
      "products": { type: [ItemOrderSchema], require: true },
      "timestamp": { type: Date, default: Date.now },
      "estado": { type: String, require: true }, 
      "username": {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: {
          validator: function(email) {
            let regex = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(email);
          },
          message: props => `${props.value} is not a valid email!`
        },
    },
  })

 
export default {OrderSchema,ItemOrderSchema};