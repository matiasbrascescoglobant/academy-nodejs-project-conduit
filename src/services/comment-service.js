import CommentModel from '../models/comments-model';

const createComment = async data => {
    const newComment = new CommentModel({
        ...data
    });

    return newComment.save();
};

export {
    createComment
}