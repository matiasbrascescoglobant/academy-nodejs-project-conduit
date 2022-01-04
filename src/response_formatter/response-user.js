const responseUser = (user) => ({
    email: user.email,
    token: user.token || "",
    username: user.username,
    bio: user.bio || "",
    image: user.image || null
  });
  
  const responseUsers = (users) => {
      if (Array.isArray(users))
        return users.map(user => responseUser(user));
      
      return responseUser(users);
    }
  
  export {
    responseUsers
  }