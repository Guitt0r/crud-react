import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { fetchPostById, selectDetailedPost, selectIsPending } from '../../redux/post.slice.ts';
import { useParams } from 'react-router-dom';

const DetailedPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(fetchPostById(+id));
  }, [dispatch, id]);
  const detailedPost = useAppSelector(selectDetailedPost);
  const isPending = useAppSelector(selectIsPending);
  if (isPending || !detailedPost) return <div>loading...</div>; //Todo:make preloader
  return (
    <>
      {detailedPost.title}
      <img src={detailedPost.image} alt={detailedPost.title} />
      {detailedPost.text}
    </>
  );
};
export default DetailedPost;
