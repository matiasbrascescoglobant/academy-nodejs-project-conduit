const withoutImage = "https://th.bing.com/th/id/OIP.mwhUIb-rNVOl0fRnsAO9JAAAAA?pid=ImgDet&rs=1";

const responseUser = (user) => ({
    email: user.email,
    token: user.token || "",
    username: user.username,
    bio: user.bio || "",
    image: user.image || withoutImage
  });
  
  const responseUsers = (users) => {
      if (Array.isArray(users))
        return users.map(user => responseUser(user));
      
      return responseUser(users);
    }
  
  export {
    responseUsers
  }