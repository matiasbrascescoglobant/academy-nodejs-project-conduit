import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    slug: { type: String, required: [true, 'The slug of the article cannot be empty.'] },
    title: { type: String, required: [true, 'The title of the article cannot be empty.'] },
    description: { type: String, required: [true, 'The description of the article cannot be empty.'] },
    body: { type: String, required: [true, 'The body of the article cannot be empty.'] },
    tagList: [
        {
            tag: String
        }
    ],
    favorited: Boolean,
    favoritesCount: Number,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('article', ArticleSchema);