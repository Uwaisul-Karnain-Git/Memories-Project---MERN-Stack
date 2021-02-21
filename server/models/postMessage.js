import mongoose from 'mongoose';

/* Create a 'mongoose Schema'. 
Using a 'Schema', we can give some sort of uniformity to our documents by defining a common set of properties. */
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Turn the Schema into a 'model'
const PostMessage = mongoose.model('PostMessage', postSchema);

/* Exporting a 'mongoose model' from the 'PostMessage' file and then on that model, we'll be able to run commands 
such as find, create, update and delete */
export default PostMessage;


