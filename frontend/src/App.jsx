
import './App.css'
import {Routes,BrowserRouter,Route} from 'react-router-dom'
import Home from "./Home"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import ClientDashboard from './pages/ClientDashboard'
import UserDashboard from './pages/UserDashboard'
import Nav from './pages/Home/Nav'
import Products from './pages/products/Products'
import Blogs from './pages/blogs/Blogs'
function App() {

  return (
   <>
  
    <BrowserRouter>
    <Nav/>
      <Routes>
          <Route path='' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products/>}/>
          <Route path='/blogs' element={<Blogs/>} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>            
            } />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>            
            } />

          <Route path="/client-dashboard" element={
            <ProtectedRoute><ClientDashboard /></ProtectedRoute>            
            } />

          <Route path="/user-dashboard" element={
            <ProtectedRoute><UserDashboard /></ProtectedRoute>            
            } />
      </Routes>
    </BrowserRouter>

   </>
  )
}

export default App
