import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, updateUser } from '../services/user-service';

const add_users = async (req, res) => {
    try{
      const {email, password, username } = req.body.user;

      const user = await findUserByEmail(email);
      if (user) {
          return res.status(422).json({
              error: 'The email already exists.'
          });
      }

      const newUser = await createUser({
          email,
          password,
          username
      });

      return res.status(201).json({
        user: {
          email: newUser.email,
          token: "",
          username: newUser.username,
          bio: newUser.bio || "",
          image: newUser.image || null
        }
      });

    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
}

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        const user = await findUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(422).json({
                error: 'Wrong credentials'
            });
        }

        const token = jwt.sign({
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);

        return res.json({
            user: {
                email: user.email,
                token,
                username: user.username,
                bio: user.bio || "",
                image: user.image || null
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
  }

  const update_users = async (req, res) => {
    try {
      const user = await findUserByEmail(req.user.email);
      if (!user) {
        return res.status(422).json({
          error: 'User not found'
        });
      }
  
      const updatedUser = await updateUser(user, req.body);

      return res.json({
        user: {
          email: updatedUser.email,
          username: updatedUser.username,
          bio: updatedUser.bio || "",
          image: updatedUser.image || null,
          token: req.user.token || ""
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  const get_current_user = async (req, res) => {
    try {
      const { email } = req.user
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(422).json({
          error: 'User not found'
        });
      }
  
      return res.json({
        user: {
          email: user.email,
          username: user.username,
          bio: user.bio || "",
          image: user.image || null,
          token: req.user.token || ""
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }

export {
    add_users,
    login_user,
    update_users,
    get_current_user
};