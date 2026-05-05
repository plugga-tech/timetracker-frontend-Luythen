import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import useSession from './components/useSession'
import UserPanel from './components/userPanel';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const { isAuthenticated, userInfo, loading } = useSession();
  return (
    <BrowserRouter>
    <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="login" element={<Login isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="register" element={<Register isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="panel" element={<UserPanel isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
