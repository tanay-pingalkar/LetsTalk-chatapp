const mongoose= require("mongoose");
const msgSchema= mongoose.Schema({
    name: String,
    msg: String,
    time: {}
});

module.exports = mongoose.model('content', msgSchema);