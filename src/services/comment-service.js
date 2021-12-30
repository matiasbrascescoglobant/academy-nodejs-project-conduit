import CommentModel from '../models/comments-model';

const createComment = async data => {
    const newComment = new CommentModel({
        ...data
    });

    return newComment.save();
};

const getComments = (article) => {
    return CommentModel.find({ article: article })
            .populate('author')
            .populate('article');
}

export {
    createComment,
    getComments
}