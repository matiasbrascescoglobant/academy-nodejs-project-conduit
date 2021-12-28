import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: { type: String, required: [true, 'The name of the tag cannot be empty.'] }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('tag', TagSchema);