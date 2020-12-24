const mongoose= require("mongoose");
const msgSchema= mongoose.Schema({
    roomName: String,
    people:Array
});

module.exports = mongoose.model('rooms', msgSchema);