import ArticleModel from '../models/articles-model';
import usersModel from '../models/users-model';

const getArticles = (query) => {
    const limit = 20;
    const offset = 0;

    if(typeof query.limit !== 'undefined'){
        limit = query.limit;
    }

    if(typeof query.offset !== 'undefined'){
        offset = query.offset;
    }

    return ArticleModel.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec();
};

const getSingleArticleBySlug = (slug) => {
    return ArticleModel.findOne({ slug: slug })
            .populate('author');
}

const createArticle = async data => {
    const newArticle = new ArticleModel({
        ...data
    });

    return newArticle.save();
};

const updateArticle = async (article, body) => {

    if(typeof body.article.title !== 'undefined'){
        body.article.slug = body.article.title;
    }

    return await ArticleModel.findByIdAndUpdate(article.id, body.article, { new: true });
}

const findArticleBySlug = slug => ArticleModel.findOne({ slug }); 

export {
    getArticles,
    createArticle,
    getSingleArticleBySlug,
    updateArticle,
    findArticleBySlug
}