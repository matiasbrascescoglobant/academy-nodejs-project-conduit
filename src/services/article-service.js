import ArticleModel from '../models/articles-model';

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

const findArticleBySlug = slug => ArticleModel.findOne({ slug }).populate('author');

const favoriteArticle = async (article) => {
    article.favorited = Boolean(true);
    if(typeof article.favoritesCount === 'undefined'){
        article.favoritesCount = Number(1);
    } else {
        article.favoritesCount = Number(article.favoritesCount + 1);
    }
    
    return await ArticleModel.findByIdAndUpdate(article.id, article, { new: true });
}

const unfavoriteArticle = async (article) => {
    if(typeof article.favoritesCount === 'undefined'){
        article.favoritesCount = Number(0);
    } else {
        article.favoritesCount = Number(article.favoritesCount - 1);
    }

    if(article.favoritesCount === 0){
        article.favorited = Boolean(false);
    }
    
    return await ArticleModel.findByIdAndUpdate(article.id, article, { new: true });
}

const deleteArticle = (slug) => {
    console.log("slug")
    console.log(slug)
    return ArticleModel.deleteOne({ slug: slug });
}

export {
    getArticles,
    createArticle,
    getSingleArticleBySlug,
    updateArticle,
    findArticleBySlug,
    favoriteArticle,
    unfavoriteArticle,
    deleteArticle
}