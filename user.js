import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    userName: String,
    userPassword: String
});

export default mongoose.model('userImformation', UserSchema);
