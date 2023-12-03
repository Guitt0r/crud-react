import { DocumentTextIcon, MinusIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { onImageFileChange } from '../utils.ts';
import { Link } from 'react-router-dom';
import { Button } from './buttons.tsx';
import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Post } from '../types.ts';

type FormData = Pick<Post, 'title' | 'text' | 'image' | 'url'>;

const Form = ({
  onSubmit,
  register,
  uploadImageUrl,
  setUploadImageUrl,
  post,
}: {
  onSubmit: () => void;
  register: UseFormRegister<FormData>;
  uploadImageUrl: string | undefined;
  setUploadImageUrl: (url: string) => void;
  post?: Post;
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='rounded-md bg-gray-50 p-4 md:p-6'>
          {/* Post Title */}
          <div className='mb-4'>
            <label htmlFor='title' className='mb-2 block text-sm font-medium'>
              Type a post title
            </label>
            <div className='relative mt-2 rounded-md'>
              <div className='relative'>
                <input
                  id='title'
                  type='text'
                  defaultValue={post?.title}
                  placeholder='Enter title'
                  className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  {...register('title', { required: true })}
                />
                <MinusIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
              </div>
            </div>
          </div>

          {/* Post Text */}
          <div className='mb-4'>
            <label htmlFor='text' className='mb-2 block text-sm font-medium'>
              Type a post text
            </label>
            <div className='relative mt-2 rounded-md'>
              <div className='relative'>
                <textarea
                  id='text'
                  defaultValue={post?.text}
                  placeholder='Enter text'
                  className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  {...register('text', { required: true })}
                />
                <DocumentTextIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
              </div>
            </div>
          </div>

          {/* Post Image */}
          <div className='mb-4'>
            <label htmlFor='text' className='mb-2 block text-sm font-medium'>
              Upload post image
            </label>
            <img
              className='border rounded object-cover text-center'
              width={150}
              height={150}
              src={uploadImageUrl || post?.image}
              alt='Choosen image'
            />
            <div className='relative mt-2 rounded-md'>
              <div className='relative'>
                <input
                  id='text'
                  type='file'
                  className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  {...register('image', {
                    required: true,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => onImageFileChange(e, setUploadImageUrl),
                  })}
                />
                <PhotoIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex justify-end gap-4'>
          <Link
            to='/'
            className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
          >
            Cancel
          </Link>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </>
  );
};
export default Form;
