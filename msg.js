const mongoose= require("mongoose");
const msgSchema= mongoose.Schema({
    name: String,
    msg: String,
});

module.exports = mongoose.model('content', msgSchema);