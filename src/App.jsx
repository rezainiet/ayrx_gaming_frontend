import './App.css';
import './global.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Shared/Navbar/Navbar';
import Login from './components/Shared/Auth/Login/Login';
import Register from './components/Shared/Auth/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfilePage2 from './pages/ProfilePage/ProfilePage2';
import RequireAuth from './helper/RequireAuth/RequireAuth';
import ProfilePage3 from './pages/ProfilePage/ProfilePage3';
import Chat from './pages/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import GamePage from './pages/GamePage/GamePage';
import GameDetails from './pages/GamePage/GameDetails/GameDetails';
import GameGroup from './pages/GamePage/GameDetails/RelatedGroups/GameGroup/GameGroup';
import UserProfile from './pages/UserProfile/UserProfile';
import SearchResults from './pages/SearchResults/SearchResults';
import ProjectDetails from './pages/UserProfile/UserProfileNav/ProjectDetails';

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socket);

  useEffect(() => {
    let newSocket;
    if (authUser) {
      // newSocket = io('https://www.api.onlyhumanity.co.uk', {
      newSocket = io('https://www.api.onlyhumanity.co.uk', {
        transports: ['websocket'],
        withCredentials: true,
        query: {
          userId: authUser?._id
        }
      });

      newSocket.on('connect', () => {
        console.log(`Connected with socket ID: ${newSocket.id}`);
        dispatch(setSocket(newSocket));
      });

      newSocket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      newSocket.on('connect_error', (err) => {
        console.error(`Connection error: ${err.message}`, err);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
      }
      dispatch(setSocket(null));
    }
  }, [authUser, dispatch]);

  return (
    <div className='max-w-screen-2xl mx-auto sm:px-0 md:px-3 lg:px-6 py-6 font-poppins bg-bg_color'>
      <Navbar />
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/games' element={<GamePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path='/game/:id' element={<GameDetails />} />
          <Route path='/session-based-project/:id' element={<ProjectDetails />} />
          <Route path='/profile/:userId' element={<RequireAuth><UserProfile /></RequireAuth>} />
          <Route path='/game/groups/:groupId' element={<RequireAuth><GameGroup /></RequireAuth>} />
          <Route path='/profile' element={<RequireAuth><ProfilePage3 /></RequireAuth>} />
          <Route path='/chat' element={<RequireAuth><Chat /></RequireAuth>} />
          <Route exact path='/profile2' element={<ProfilePage2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
