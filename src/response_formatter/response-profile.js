const responseProfile = (profile) => ({
    username: profile.user.username,
    bio: profile.user.bio || "",
    image: profile.user.image || null,
    following: profile.user.following || false,
  });
  
  export {
    responseProfile
  }