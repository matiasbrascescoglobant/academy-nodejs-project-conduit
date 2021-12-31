const responseTag = (tag) => (
    tag
  );
  
  const responseTags = (tags) => {
      if (Array.isArray(tags))
        return tags.map(tag => responseTag(tag.name));
      
      return responseTag(tags);
    }
  
  export {
    responseTags
  }