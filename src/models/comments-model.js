import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: { type: String, required: [true, 'The body of the comment cannot be empty.'] },
    author: { type: Schema.Types.ObjectId, ref: "user" },
    article: { type: Schema.Types.ObjectId, ref: "article" }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('comment', CommentSchema);