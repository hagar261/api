const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    isDEleted : {type:Boolean , default: false},
    // age: { type: Number, min: [6, "err min"] },
    // role: { type: String },
    // verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next) {
  console.log(" pre hash password");
  this.password = await bcrypt.hash( this.password , 7 );
  next();
})

module.exports = userSchema;