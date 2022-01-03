import ProfileModel from '../models/profiles-model';

const createProfile = async data => {
    const newProfile = new ProfileModel({
        ...data
    });

    return newProfile.save();
};

const findFollowings = (user) => ProfileModel.find({ follower: user });

const findFollowers = (user) => ProfileModel.find({ following: user });

const getProfile = (follower, following) => ProfileModel
                    .findOne({ follower: follower, following: following });     
                    
const deleteProfile = (follower, following) => ProfileModel
                    .findOneAndDelete({ follower: follower, following: following })
                    .populate('following');                    

export {
    createProfile,
    findFollowers,
    findFollowings,
    getProfile,
    deleteProfile
}