import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route,useNavigate } from 'react-router-dom'
import Login from './login/Login'
import Home from './home/Home'
import Users from './users/Users'
import UserData from './usersdata/UserData'
import SIdeBar from './sidebar/SideBar'
import Service from './service/Service'
import Comment from './comments/Comments'
function App() {
 

  return (

      <div>
<Router>
  <Routes>
  <Route path='/' element={<Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/users' element={<Users/>}></Route>
    <Route path='/data' element={<UserData/>}></Route>
    <Route path='/side' element={<SIdeBar/>}></Route>
    <Route path='/service' element={<Service/>}></Route>
    <Route path='/comment' element={<Comment/>}></Route>
  </Routes>
</Router>
      </div>
      
  
  )
}

export default App
