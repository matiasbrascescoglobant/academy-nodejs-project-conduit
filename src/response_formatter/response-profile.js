const responseProfile = (user) => ({
    username: user.username,
    bio: user.bio || "",
    image: user.image || null,
    following: user.following || false,
  });
  
  export {
    responseProfile
  }