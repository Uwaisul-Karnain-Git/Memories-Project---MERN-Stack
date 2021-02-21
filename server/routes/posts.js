import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'; 
// In 'React' we don't have to mention '.js', but it's mandatory in 'Node.js'

const router = express.Router();

// This callback function will execute when we visit http://localhost:5000/
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);  // 'patch' is used for 'Updating Existing Documents'
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);  // 'Liking' means updating number of likes

export default router;

