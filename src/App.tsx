import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import useSession from './components/useSession'

function App() {
  const { isAuthenticated, userInfo } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path="register" element={<Register isAuthenticated={isAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
