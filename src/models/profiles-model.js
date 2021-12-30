import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('profile', ProfileSchema);