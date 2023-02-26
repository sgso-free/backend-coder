import mongoose from "mongoose"


const MessageSchema = new mongoose.Schema({
    "email": { type: String, require: true },
    "tipo": { type: String, require: true },
    "cuerpo": { type: String, require: true }, 
    "timestamp": { type: Date, default: Date.now },
  })

  export default MessageSchema;