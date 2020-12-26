const mongoose= require("mongoose");



const UserSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
    roomsJoined: Array,
    prevRoom: String,
});

module.exports=mongoose.model('userImformation', UserSchema);
