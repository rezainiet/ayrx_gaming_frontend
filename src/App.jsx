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

function App() {

  return (
    <div className='max-w-screen-2xl mx-auto sm:px-0 md:px-3 lg:px-6 py-6 font-poppins bg-bg_color'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/profile' element={

          <ProfilePage3 />

        }></Route>
        <Route path='/chat' element={
          // <RequireAuth>
          <Chat />
          // </RequireAuth>
        }></Route>
        <Route exact path='/profile2' element={<ProfilePage2 />}></Route>
      </Routes>
    </div>
  )
}

export default App
