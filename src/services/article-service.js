import ArticleModel from '../models/articles-model';
import UsersModel from '../models/users-model';
import TagsModel from '../models/tags-model';

const getArticles = (query) => {
    const { author: username, tag, favorited, offset = 0, limit = 20 } = query;

    return ArticleModel.find({ 
        limit: limit, 
        offset: offset,
        distinct: true,
        order: [['createdAt', 'DESC']], 
        include: 
        [
            {
                model: UsersModel,
                where: 
                    {
                        ...(username && { username })
                    },
                atributes: ['username', 'bio', 'image'],
                required: false   
            },
            {
                model: TagsModel,
                attributes: ['name'],
                where: 
                    {
                        ...(tag && { name: tag })
                    },
                required: false
            }
        ],
        where: { ...(favorited && {favorited}) }
    });
};

const createArticle = async data => {
    const newArticle = new ArticleModel({
        ...data
    });

    return newArticle.save();
};

export {
    getArticles,
    createArticle
}