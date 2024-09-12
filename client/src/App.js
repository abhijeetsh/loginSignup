// import logo from './logo.svg';
import './App.css';
import HomePage from "../src/components/HomePage/HomePage.js"
import Login from "../src/components/Login/Login.js"
import Register from "../src/components/Register/Register.js"
import {BrowserRouter, Routes,Route } from "react-router-dom"
import { useState } from 'react';

function App() {
  const [user,setLoginUser] = useState({})
  return (
    <div className='App'>
      <BrowserRouter>
  <Routes>
    <Route eaxct path='/' element={user && user._id ? <HomePage/>:<Login setLoginUser={setLoginUser}/>} />
    
   
    <Route  path='/login' element={<Login setLoginUser={setLoginUser}/>}/>
    <Route  path='/register' element={<Register />} /> 
  </Routes>
</BrowserRouter>

      
    </div>
  );
}

export default App;
