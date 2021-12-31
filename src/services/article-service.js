import ArticleModel from '../models/articles-model';
import { findUserByUsername } from '../services/user-service';
import { findTagByName } from '../services/tag-service';

const getArticles = async (query) => {
    let limit = 20;
    let offset = 0;
    let queryFind = {};

    if(query.author) {
        const author = await findUserByUsername(query.author);
        if(author){
            queryFind.author = author.id;
        } else if (query.author) {
            queryFind.author = null;
        }
    }

    if(query.tag){
        const tag = await findTagByName(query.tag);
        if(tag){
            queryFind.tagList = {"$in" : [tag._id]};
        } else {
            queryFind.tagList = null;
        }
    }

    if(typeof query.limit !== 'undefined'){
        limit = query.limit;
    }

    if(typeof query.offset !== 'undefined'){
        offset = query.offset;
    }

    return ArticleModel.find(queryFind)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .populate('tagList')
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

    return (await newArticle.save()).populate('tagList');
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