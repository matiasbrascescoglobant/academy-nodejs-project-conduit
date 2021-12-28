const responseArticle = (article) => ({
  slug: article.slug,
  title: article.title,
  description: article.description,
  body: article.body,
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
  favorited: article.favorited,
  favoritesCount: article.favoritesCount,
  author: 
    {
        username: article.User.username,
        bio: article.User.bio,
        image: article.User.image,
        following: false
    },
  tagList: ({ nameTags }) => nameTags.map(tag => tag.name)
});

const responseArticles = (articles) => {
    if (Array.isArray(articles))
      return articles.map(article => responseArticle(article));
    
    return responseArticle(articles);
  }

export {
  responseArticles
}