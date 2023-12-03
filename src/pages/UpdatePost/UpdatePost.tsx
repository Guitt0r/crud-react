import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEffect, useState } from 'react';
import { fetchPostById, selectDetailedPost, updatePost } from '../../redux/post.slice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../types.ts';
import { toast } from 'react-toastify';
import Form from '../../components/form.tsx';

type FormData = Pick<Post, 'title' | 'text' | 'url'> & { image: FileList };

const UpdatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [uploadImageUrl, setUploadImageUrl] = useState<string>();

  //fetch post
  useEffect(() => {
    if (id) dispatch(fetchPostById(+id));
  }, [dispatch, id]);

  const post = useAppSelector(selectDetailedPost);

  //if no id return to previous page
  if (!id) {
    navigate(-1);
    toast.error('No such post');
  }

  const { register, handleSubmit, reset } = useForm<FormData>({});

  const onSubmit = handleSubmit((data) => {
    //Save image file to image, and for url save url string with blob/file object
    dispatch(
      updatePost({
        title: data.title,
        text: data.text,
        image: data.image[0],
        url: uploadImageUrl || '',
        postId: +id!,
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        reset();
        toast.error('Oops something went wrong,try again!');
      });
  });
  if (!post) return <div>loading...</div>; //Todo:
  return (
    <Form
      uploadImageUrl={uploadImageUrl}
      setUploadImageUrl={setUploadImageUrl}
      onSubmit={onSubmit}
      register={register}
      post={post}
    />
  );
};
export default UpdatePost;
