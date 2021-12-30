import ProfileModel from '../models/profiles-model';

const createProfile = async data => {
    const newProfile = new ProfileModel({
        ...data
    });

    return newProfile.save();
};

const findProfileByUser = user => ProfileModel.findOne({ user: user }).populate('user');

export {
    createProfile,
    findProfileByUser
}