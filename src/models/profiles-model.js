import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    follower: { type: Schema.Types.ObjectId, ref: "user" },
    following: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('profile', ProfileSchema);