import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: [true, 'The username of the user cannot be empty.'] },
    password: { type: String, required: [true, 'The password of the user cannot be empty.'] },
    email: {    
                type: String, required: [true, 'The email of the user cannot be empty.'], 
                trim: true, index: true, unique: true, sparse: true 
            },
    bio: String,
    image: String
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('user', UserSchema);