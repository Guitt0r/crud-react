import { Route, Routes } from 'react-router-dom';
import DetailedPost from './pages/DetailedPost/DetailedPost.tsx';
import CreatePost from './pages/CreatePost/CreatePost.tsx';
import PostsPage from './pages/PostsPage/PostsPage.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePost from './pages/UpdatePost/UpdatePost.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PostsPage />} />
        <Route path='/detailed-post/:id' element={<DetailedPost />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/:id/edit' element={<UpdatePost />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};
export default App;
