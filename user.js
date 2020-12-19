const mongoose= require("mongoose");



const UserSchema = new mongoose.Schema({
    userName: String,
    userPassword: String
});

module.exports=mongoose.model('userImformation', UserSchema);
