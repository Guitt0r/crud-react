import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { fetchPostById, selectDetailedPost, selectIsPending } from '../../redux/post.slice.ts';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/loader.tsx';

const DetailedPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(fetchPostById(+id));
  }, [dispatch, id]);
  const detailedPost = useAppSelector(selectDetailedPost);
  const isPending = useAppSelector(selectIsPending);
  if (isPending || !detailedPost) return <Loader />;
  return (
    <>
      <h1 className='text-5xl text-center my-5'>#{detailedPost.id}</h1>
      <div className='grid md:grid-cols-2 gap-4 p-4'>
        <img className='w-full rounded shadow' src={detailedPost.url} alt={detailedPost.title} />
        <div className=''>
          <h1 className='text-center text-3xl'>{detailedPost.title}</h1>
          <p>{detailedPost.text}</p>
          <Link
            to='/'
            className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400  active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          >
            Back to posts
          </Link>
        </div>
      </div>
    </>
  );
};
export default DetailedPost;
