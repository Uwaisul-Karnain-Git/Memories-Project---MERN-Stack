import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  // This means that we import everything(*) from 'api/index.js' file as 'api'.
                                // We do it this way because we are going to have a lot of calls exported from 'api'

// Action Creators

/* To fetch all the Posts, some time is going to be consumed and for that we have to use 'redux-thunk' which allows us to specify an 
'Additional Arrow Function' */
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
    
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err);
    }    
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err);
    }    
};


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    
    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};



