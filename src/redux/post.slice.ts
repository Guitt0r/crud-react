import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postAPI } from '../api';
import { Post } from '../types.ts';
import { RootState } from './store.ts';

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (_, { rejectWithValue }) => {
  try {
    return postAPI.getAll();
  } catch (e) {
    return rejectWithValue(e);
  }
});
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number, { rejectWithValue }) => {
  try {
    return postAPI.getById(postId);
  } catch (e) {
    return rejectWithValue(e);
  }
});
export const createPost = createAsyncThunk('posts/createPost', async (post: Partial<Post>, { rejectWithValue }) => {
  try {
    return postAPI.createPost(post);
  } catch (e) {
    return rejectWithValue(e);
  }
});
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (
    {
      postId,
      ...post
    }: Partial<Post> & {
      postId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      return postAPI.updatePost(post, postId);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number, { rejectWithValue }) => {
  try {
    const res = await postAPI.deletePost(postId);
    if (res[1]) return postId;
  } catch (e) {
    return rejectWithValue(e);
  }
});

type PostsState = {
  posts: Post[];
  detailedPost: Post | null;
  isPending: boolean;
};

const initialState: PostsState = {
  posts: [],
  detailedPost: null,
  isPending: false,
};

// For future, maybe add some errors handling logic(logging, send them to server, etc.):
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.isPending = false;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchAllPosts.rejected, () => {
        //TODO:write logic
      })

      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.detailedPost = action.payload;
        state.isPending = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchPostById.rejected, () => {
        //TODO:write logic
      })

      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
        state.isPending = false;
      })

      .addCase(createPost.rejected, () => {
        //TODO:write logic
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) post = { ...action.payload };
          return post;
        });
        state.isPending = false;
      })

      .addCase(updatePost.rejected, () => {
        //TODO:write logic
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.isPending = false;
      })
      .addCase(deletePost.rejected, () => {
        //TODO:write logic
      });
  },
});

export const selectAllPosts = (state: RootState) => state.post.posts;
export const selectDetailedPost = (state: RootState) => state.post.detailedPost;
export const selectIsPending = (state: RootState) => state.post.isPending;

export default postsSlice.reducer;
