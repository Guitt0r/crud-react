import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store.ts';
import { useState } from 'react';
import { createPost } from '../../redux/post.slice.ts';
import { Post } from '../../types.ts';
import { toast } from 'react-toastify';
import Form from '../../components/form.tsx';
import { useNavigate } from 'react-router-dom';

type FormData = Pick<Post, 'title' | 'text' | 'url'> & { image: FileList };

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [uploadImageUrl, setUploadImageUrl] = useState<string>();

  const onSubmit = handleSubmit((data) => {
    //Save image file to image, and for url save url string with blob/file object
    dispatch(
      createPost({
        title: data.title,
        text: data.text,
        image: data.image[0],
        url: uploadImageUrl || '',
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Post was successfully created');
        navigate('/');
      })
      .catch(() => {
        reset();
        setUploadImageUrl('');
        toast.error('Oops something went wrong,try again!');
      });
  });

  return (
    <Form
      uploadImageUrl={uploadImageUrl}
      setUploadImageUrl={setUploadImageUrl}
      onSubmit={onSubmit}
      register={register}
    />
  );
};
export default CreatePost;
