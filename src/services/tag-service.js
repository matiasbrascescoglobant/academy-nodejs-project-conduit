import TagModel from '../models/tags-model';

const createTag = async data => {
    
    const newTag = new TagModel({
        ...data,
    });

    return newTag.save();
};

const findTagByName = name => TagModel.findOne({ name }); 


export {
    createTag,
    findTagByName
}