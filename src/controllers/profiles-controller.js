import { createProfile, getProfile, deleteProfile } from '../services/profile-service';
import { findUserByEmail, findUserByUsername } from '../services/user-service';
import { responseProfile } from '../response_formatter/response-profile';
import { responseError } from '../response_formatter/response-errors';

const get_profile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(422).json({
        errors: responseError('User not found')
      });
    }

    const follower = await findUserByEmail(req.user?.email);
    
    user.following = await getProfile(follower, user).count() > 0;

    return res.json({
      profile: responseProfile(user)
    });
  } catch (error) {
    return res.status(422).json({
      errors: responseError(error.message)
    })
  }
}

const follow_user = async (req, res) => {
  try{
    const { username } = req.params;

    const following = await findUserByUsername(username);
    if (!following) {
      return res.status(422).json({
        errors: responseError('User not found')
      });
    }

    const { email } = req.user;

    const follower = await findUserByEmail(email);
    if (!follower) {
      return res.status(422).json({
        errors: responseError('User not found')
      });
    }
    
    const profileExists = await getProfile(follower, following).count() > 0;
    if(!profileExists) {
      following.following = true;
      await createProfile({ follower: follower, following: following });
    }

    return res.json({
      profile: responseProfile(following)
    });

  }catch(error){
      return res.status(422).json({
        errors: responseError(error.message)
      });
  }
}

const unfollow_user = async (req, res) => {
  try{
    const { username } = req.params;

    const following = await findUserByUsername(username);
    if (!following) {
      return res.status(422).json({
        errors: responseError('User not found')
      });
    }

    const { email } = req.user;

    const follower = await findUserByEmail(email);
    if (!follower) {
      return res.status(422).json({
        errors: responseError('User not found')
      });
    }
    
    const profileDeleted = await deleteProfile(follower, following);

    return res.json({
      profile: responseProfile(profileDeleted.following)
    });

  }catch(error){
      return res.status(422).json({
        errors: responseError(error.message)
      });
  }
}

export {
    get_profile,
    follow_user,
    unfollow_user
};