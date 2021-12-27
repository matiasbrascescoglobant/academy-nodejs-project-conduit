import { createUser } from '../services/user-service';

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

export {
    add_users
};