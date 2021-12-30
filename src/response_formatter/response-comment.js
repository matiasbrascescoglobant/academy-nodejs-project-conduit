const responseComment = (comment) => ({
    id: comment.id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    body: comment.body,
    author: 
      {
          username: comment.author.username,
          bio: comment.author.bio || "",
          image: comment.author.image || null,
          following: false
      }
  });
  
  const responseComments = (comments) => {
      if (Array.isArray(comments))
        return comments.map(comment => responseComment(comment));
      
      return responseComment(comments);
    }
  
  export {
    responseComments
  }