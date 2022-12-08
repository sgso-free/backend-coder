const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    "username": { type: String, require: true },
    "password": { type: String, require: true }, 
    "timestamp": { type: Date, default: Date.now },
  })

//the passwword is encript before save
UserSchema.pre('save', async function(next) {
    try {
      console.log("entrar save userschema")
      // check method of registration
      const user = this;  

      //Use isModified to check whether the password is changing since you only need to hash new passwords.
      if (!user.isModified('password')) next();
      // generate salt
      const salt = await bcrypt.genSalt(10);
      // hash the password
      const hashedPassword = await bcrypt.hash(this.password, salt);
      // replace plain text password with hashed password
      this.password = hashedPassword;
      next();
    } catch (error) {
      console.log("Entro error schema")
      return next(error);
    }
});


  UserSchema.methods.matchPassword = async function (password) {
    try {
      let match = await bcrypt.compare(password, this.password)
      console.log("Find match",match)
      return match;
    } catch (error) {
      throw new Error(error);
    }
   };

module.exports = UserSchema;