import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/user-service';

const add_users = async (req, res) => {
    try{
        const {email, password, username, bio, image } = req.body.user;

        const newUser = await createUser({
            email,
            password,
            username,
            bio,
            image
        });

        return res.status(201).json({
            user: newUser
          })

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body.user
        const user = await findUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(422).json({
                error: 'Wrong credentials'
            })
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
                bio: user.bio,
                image: user.image
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
  }

export {
    add_users,
    login_user
};