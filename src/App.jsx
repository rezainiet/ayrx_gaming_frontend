import './App.css'
import './global.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Navbar from './components/Shared/Navbar/Navbar'
import Login from './components/Shared/Auth/Login/Login'
import Register from './components/Shared/Auth/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProfilePage2 from './pages/ProfilePage/ProfilePage2'
import RequireAuth from './helper/RequireAuth/RequireAuth'
import ProfilePage3 from './pages/ProfilePage/ProfilePage3'
import Chat from './pages/Chat/Chat'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:4000', {
        transports: ['websocket'], // Force WebSocket transport to avoid polling
        withCredentials: true
      });

      // newSocket.on('connect', () => {
      //   console.log(`Connected with socket ID: ${newSocket.id}`);
      // });

      // newSocket.on('connect_error', (err) => {
      //   console.error(`Connection error: ${err.message}`);
      // });

      // setSocket(newSocket);

      // Clean up the connection when the component unmounts or authUser changes
      // return () => {
      //   newSocket.close();
      // };
    }
  }, [authUser]);

  return (
    <div className='max-w-screen-2xl mx-auto sm:px-0 md:px-3 lg:px-6 py-6 font-poppins bg-bg_color'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<ProfilePage3 />} />
        <Route path='/chat' element={<Chat />} />
        <Route exact path='/profile2' element={<ProfilePage2 />} />
      </Routes>
    </div>
  );
}

export default App;
