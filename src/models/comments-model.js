import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: { type: String, required: [true, 'The body of the comment cannot be empty.'], unique: true },
    author: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
});

CommentSchema.plugin(uniqueValidator, {message: 'is already exist'});

export default mongoose.model('comment', CommentSchema);