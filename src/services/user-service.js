import UserModel from '../models/users-model';
import bcrypt from 'bcryptjs';

const createUser = async data => {
    const hashedPass = encryptPass(data.password);
    
    const newUser = new UserModel({
        ...data,
        password: hashedPass
    });

    return newUser.save();
};

const findUserByEmail = email => UserModel.findOne({ email }); 

const findUserByUsername = username => UserModel.findOne({ username });

const updateUser = async (user, body) => {
    const password = body.user.password ? encryptPass(body.user.password) : user.password;
    body.user.password = password;

    return await UserModel.findByIdAndUpdate(user.id, body.user, { new: true });
} 

function encryptPass(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    return hashedPass
}

export {
    createUser,
    findUserByEmail,
    updateUser,
    findUserByUsername
}