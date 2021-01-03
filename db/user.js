const mongoose= require("mongoose");



const UserSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
    roomsJoined: Array,
    prevRoom: {default:'none', type:String},
});

module.exports=mongoose.model('userImformation', UserSchema);
