const mongoose= require("mongoose");
const msgSchema= mongoose.Schema({
    text: String,
    prevRoom: String,
    userName:String
});

module.exports = mongoose.model('content', msgSchema);