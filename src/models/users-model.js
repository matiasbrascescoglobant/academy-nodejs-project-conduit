import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { 
                type: String, required: [true, 'The username of the user cannot be empty.'], 
                unique: true, index: true 
              },
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

UserSchema.plugin(uniqueValidator, {message: 'is already exist'});

export default mongoose.model('user', UserSchema);