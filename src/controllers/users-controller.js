import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, updateUser } from '../services/user-service';
import { responseUsers } from '../response_formatter/response-user';
import { responseError } from '../response_formatter/response-errors';

const add_users = async (req, res) => {
    try{
      const { email, password, username } = req.body.user;

      const user = await findUserByEmail(email);
      if (user) {
          return res.status(422).json({
            errors: responseError('The email already exists')
          });
      }

      const newUser = await createUser({
          email,
          password,
          username
      });

      return res.status(201).json({
        user: responseUsers(newUser)
      });

    }catch(error){
        return res.status(422).json({
          errors: responseError(error.message)
        });
    }
}

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        const user = await findUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(422).json({
              errors: responseError('Wrong credentials')
            });
        }

        const token = jwt.sign({
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);

        user.token = token; 

        return res.json({
          user: responseUsers(user)
        });
    } catch (error) {
        return res.status(422).json({
          errors: responseError(error.message)
        });
    }
  }

  const update_users = async (req, res) => {
    try {
      const user = await findUserByEmail(req.user.email);
      if (!user) {
        return res.status(422).json({
          errors: responseError('User not found')
        });
      }

      const updatedUser = await updateUser(user, req.body);

      updatedUser.token = req.user.token;

      return res.json({
        user: responseUsers(updatedUser)
      });
    } catch (error) {
      return res.status(422).json({
        errors: responseError(error.message)
      });
    }
  }

  const get_current_user = async (req, res) => {
    try {
      const { email } = req.user
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(422).json({
          errors: responseError('User not found')
        });
      }

      user.token = req.user.token;
  
      return res.json({
        user: responseUsers(user)
      });
    } catch (error) {
      return res.status(422).json({
        errors: responseError(error.message)
      })
    }
  }

export {
    add_users,
    login_user,
    update_users,
    get_current_user
};