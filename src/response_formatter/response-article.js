import { responseTags } from '../response_formatter/response-tag';

const responseArticle = (article) => ({
  slug: article.slug,
  title: article.title,
  description: article.description,
  body: article.body,
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
  favorited: article.favorited || false,
  favoritesCount: article.favoritesCount || 0,
  author: 
    {
        username: article.author.username,
        bio: article.author.bio || "",
        image: article.author.image || null,
        following: false
    },
  tagList: responseTags(article.tagList)
});

const responseArticles = (articles) => {
    if (Array.isArray(articles))
      return articles.map(article => responseArticle(article));
    
    return responseArticle(articles);
  }

export {
  responseArticles
}