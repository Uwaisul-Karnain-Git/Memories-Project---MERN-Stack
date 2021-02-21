// Put all the 'Route related Logics' here
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;     // Renaming 'id' to '_id' with 'Object Destructuring'
    const post = req.body;

    // Check whether '_id' is a 'mongoose id'
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with ${_id}`);
    
    // Update the post in the Database - 'new: true' - To receive the updated version of that post
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with ${_id}`);
    
    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
    const { id} = req.params;
    //const post = req.body;

    // Check whether 'id' is a 'mongoose id'
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with ${id}`);
    
    // Find the post
    const post = await PostMessage.findById(id);

    // Update the 'likes' in the Database
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, likeCount: post.likeCount++}, { new: true });

    res.json(updatedPost);
};

