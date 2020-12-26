const mongoose= require("mongoose");
const msgSchema= mongoose.Schema({
    roomName: String,
    roomPassword:String,
    people:Array
});

module.exports = mongoose.model('rooms', msgSchema);