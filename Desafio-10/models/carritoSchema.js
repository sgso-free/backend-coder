const mongoose = require("mongoose");
const productoSchema = require("./productoSchema");

const carritoSchema = new mongoose.Schema({
      "productos": { type: [productoSchema], require: true },
      "timestamp": { type: Date, default: Date.now }
    })

    module.exports = carritoSchema;