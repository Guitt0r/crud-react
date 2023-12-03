import { Link } from 'react-router-dom';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../redux/store.ts';
import { deletePost } from '../redux/post.slice.ts';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}

export const CreatePost = () => {
  return (
    <Link
      to='/create'
      className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <span className='hidden md:block'>Create Invoice</span> <PlusIcon className='h-5 md:ml-4' />
    </Link>
  );
};

export const UpdatePost = ({ id }: { id: number }) => {
  return (
    <Link
      onClick={(e) => {
        e.stopPropagation();
      }}
      to={`/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  );
};

export const DeletePost = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(deletePost(id));
        }}
        className='rounded-md border p-2 hover:bg-gray-100'
      >
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </button>
    </>
  );
};
