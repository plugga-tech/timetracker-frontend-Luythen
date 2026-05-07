import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import useSession from './components/useSession'
import UserPanel from './components/userPanel';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Statistics from './components/statistics';
import Admin from './admin/Admin';

function App() {
  const { isAuthenticated, userInfo, loading, isAdmin } = useSession();
  return (
    <BrowserRouter>
    <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="statistics" element={<Statistics isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} isAdmin={isAdmin} />} />
        <Route path="login" element={<Login isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="register" element={<Register isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="panel" element={<UserPanel isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} isAdmin={isAdmin} />} />
        <Route path="admin" element={isAdmin ? <Admin isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} isAdmin={isAdmin} /> : <>404</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
