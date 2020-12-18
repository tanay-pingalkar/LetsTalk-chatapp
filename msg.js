import mongoose from 'mongoose';
const msgSchema= mongoose.Schema({
    name: String,
    msg: String,
    time: String
});

export default mongoose.model('content', msgSchema);