import { ChangeEvent } from 'react';
import { Post } from './types.ts';

export const formatDateToUTC = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toUTCString();
};

export const onImageFileChange = (e: ChangeEvent<HTMLInputElement>, setImageUrl: (url: string) => void) => {
  if (e.target.files && e.target.files[0]) {
    const fileType = e.target.files[0].type.split('/')[0];
    //only image file acceptable
    if (fileType !== 'image') {
      setImageUrl('');
      return (e.target.value = '');
    }
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }
};

export const convertPostToFormData = (post: Pick<Post, 'title' | 'text' | 'url'> & { image: File }) => {
  const formData = new FormData();
  for (const key in post) {
    const value = post[key as keyof typeof post];
    if (value === null || value === undefined) formData.append(key, '');
    else if (value instanceof FileList) formData.append(key, value);
    else formData.append(key, value.toString());
  }
  return formData;
};
