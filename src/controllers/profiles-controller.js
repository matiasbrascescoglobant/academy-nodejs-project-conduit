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

      return res.json({
        profile: responseProfile(user)
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }

export {
    get_profile
};