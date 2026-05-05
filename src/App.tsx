import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import useSession from './components/useSession'
import UserPanel from './components/userPanel';

function App() {
  const { isAuthenticated, userInfo, loading } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="register" element={<Register isAuthenticated={isAuthenticated} loading={loading} />} />
        <Route path="panel" element={<UserPanel isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
