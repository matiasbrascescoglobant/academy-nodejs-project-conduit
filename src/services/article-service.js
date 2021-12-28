import ArticleModel from '../models/articles-model';

const getAllArticles = () => ArticleModel.find();

export {
    getAllArticles
}