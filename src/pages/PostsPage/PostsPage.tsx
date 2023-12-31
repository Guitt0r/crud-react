import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEffect } from 'react';
import { fetchAllPosts, selectAllPosts, selectIsPending } from '../../redux/post.slice.ts';
import { useNavigate } from 'react-router-dom';
import { formatDateToUTC } from '../../utils.ts';
import { CreatePost, DeletePost, UpdatePost } from '../../components/buttons.tsx';
import Loader from '../../components/loader.tsx';

const PostsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const posts = useAppSelector(selectAllPosts);
  const isPending = useAppSelector(selectIsPending);
  if (isPending) return <Loader />;
  return (
    <>
      <div className='mt-4 flex items-center justify-end gap-2 md:mt-8'>
        <CreatePost />
      </div>
      {/*Mobile layout*/}
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {posts?.map((post) => (
                <div
                  onClick={(e) => {
                    !e.defaultPrevented && navigate(`/detailed-post/${post.id}`);
                  }}
                  key={post.id}
                  className='cursor-pointer mb-2 w-full rounded-md bg-white p-4'
                >
                  <div className='flex items-center justify-between border-b pb-4'>
                    <div>
                      <div className='mb-2 flex items-center'>
                        <img src={post.url} className='mr-2 w-full' width={300} height={300} alt='' />
                      </div>
                      <p>{post.title}</p>
                      <p>{post.text}</p>
                    </div>
                  </div>
                  <div className='flex w-full items-center justify-between pt-4'>
                    <div>
                      <p className='text-sm text-gray-500'>#{post.id}</p>
                      <p className='text-sm text-gray-500'>{formatDateToUTC(post.created_at)}</p>
                      <p className='text-sm text-gray-500'>{formatDateToUTC(post.updated_at)}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <UpdatePost id={post.id} />
                      <DeletePost id={post.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/*Desktop layout*/}
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Id
                  </th>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Image
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Text
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    CreatedAt
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    UpdatedAt
                  </th>
                  <th scope='col' className='relative py-3 pl-6 pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {posts?.map((post) => (
                  <tr
                    onClick={(e) => {
                      !e.defaultPrevented && navigate(`/detailed-post/${post.id}`);
                    }}
                    key={post.id}
                    className='cursor-pointer w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap px-3 py-3'>{post.id}</td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        {/*Display image with url, because saved image doesn't display*/}
                        <img
                          src={post.url}
                          className=''
                          width={150}
                          height={150}
                          alt={`${post.title}'s profile picture`}
                        />
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>{post.title}</td>
                    <td className='whitespace-nowrap px-3 py-3'>{post.text}</td>
                    <td className='whitespace-nowrap px-3 py-3'>{formatDateToUTC(post.created_at)}</td>
                    <td className='whitespace-nowrap px-3 py-3'>{formatDateToUTC(post.updated_at)}</td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'>
                        <UpdatePost id={post.id} />
                        <DeletePost id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostsPage;
