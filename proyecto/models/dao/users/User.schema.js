import mongoose from "mongoose"
import bcrypt from  'bcrypt' 

const UserSchema = new mongoose.Schema({
    "username": {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        //lo quite por solicitud de la reentrega
        /*validate: {
          validator: function(email) {
            let regex = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(email);
          },
          message: props => `${props.value} is not a valid email!`
        },*/
    },
    "password": { type: String, require: true }, 
    "name": { type: String, require: true }, 
    "age": {type: Number, min: 18, max: 99, require: true },
    "address": { type: String, require: true },     
    "phone": {
        type: String,
       validate: {
          validator: function(v) {
            let regex = /^((\(\d{3}\))|\d{3})[- ]?\d{4}[- ]?\d{4}$/;
            return regex.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    "timestamp": { type: Date, default: Date.now },
  })


//the passwword is encript before save
UserSchema.pre('save', async function(next) {
    try {
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
      return next(error);
    }
});


UserSchema.methods.matchPassword = async function (password) {
    try {
      let match = await bcrypt.compare(password, this.password)
      return match;
    } catch (error) {
      throw new Error(error);
    }
   };

export default UserSchema;