import ArticleModel from '../models/articles-model';
import usersModel from '../models/users-model';
import tagsModel from '../models/tags-model';

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
                model: usersModel,
                where: 
                    {
                        ...(username && { username })
                    },
                atributes: ['username', 'bio', 'image'],
                required: false   
            },
            {
                model: tagsModel,
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

export {
    getArticles
}