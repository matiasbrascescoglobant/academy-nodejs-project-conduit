import TagModel from '../models/tags-model';

const createTag = async data => {
    
    const newTag = new TagModel({
        ...data,
    });

    return newTag.save();
};

const findTagByName = name => TagModel.findOne({ name }); 

const getTags = () => TagModel.find(); 


export {
    createTag,
    findTagByName,
    getTags
}