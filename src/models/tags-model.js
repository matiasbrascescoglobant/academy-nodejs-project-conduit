import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: { type: String, required: [true, 'The name of the tag cannot be empty.'], unique: true }
}, {
    timestamps: true,
    versionKey: false
});

TagSchema.plugin(uniqueValidator, {message: 'is already exist'});

export default mongoose.model('tag', TagSchema);