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

function App() {

  return (
    <div className='max-w-screen-2xl mx-auto sm:px-0 md:px-3 lg:px-6 py-6 font-poppins'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route exact path='/profile' element={<ProfilePage />}></Route>
        <Route exact path='/profile2' element={<ProfilePage2 />}></Route>
      </Routes>
    </div>
  )
}

export default App
