import axios from 'axios';
import { Post } from '../types.ts';

export const $host = axios.create({
  baseURL: 'https://yourtestapi.com/api/posts/',
});

export const postAPI = {
  async getAll() {
    const res = await $host.get<Post[]>(`/`);
    return res.data;
  },
  async getById(id: number) {
    const res = await $host.get<Post>(`/${id}`);
    return res.data;
  },
  async createPost(post: Partial<Post>) {
    const res = await $host.post<Post>(``, post);
    return res.data;
  },
  async updatePost(post: Partial<Post>, id: number) {
    const res = await $host.put<Post>(`/${id}`, post);
    return res.data;
  },
  async deletePost(id: number) {
    const res = await $host.delete(`/${id}`);
    return res.data;
  },
};
