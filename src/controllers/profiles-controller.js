import { createProfile, findProfileByUser } from '../services/profile-service';
import { findUserByUsername } from '../services/user-service';
import { responseProfile } from '../response_formatter/response-profile';

  const get_profile = async (req, res) => {
    try {
      const { username } = req.params;
      const user = await findUserByUsername(username);
      if (!user) {
        return res.status(422).json({
          error: 'User not found'
        });
      }
      const profile = await findProfileByUser(user);
      if (!profile) {
        return res.status(422).json({
          error: 'Profile not found'
        });
      }

      return res.json({
        profile: responseProfile(profile)
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }

  const add_profile = async (req, res) => {
    try{
      const { username } = req.params;

      const user = await findUserByUsername(username);
      if (!user) {
        return res.status(422).json({
          error: 'User not found'
        });
      }
      
      const newProfile = await createProfile({user: user});

      return res.status(201).json({
        profile: responseProfile(newProfile)
      });

    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
}

export {
    get_profile,
    add_profile
};