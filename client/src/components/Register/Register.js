import React, { useState } from 'react'
import "./Register.css"
import axios from "axios"

import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    reEnterPassword:""
  })

  const register= () =>{
    const {name,email,password ,reEnterPassword} = user;
    if(name && email && password && (password === reEnterPassword)){
      axios.post('http://localhost:9000/register',user).
      then((res) =>{console.log(res);
        alert("user registered successful")
        navigate("/login")

      }).catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
    });
    }
    else {
      alert("Invalid Input")
    }
  }
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }
  return (
    <div className="register">
    <h1>Register</h1>
    <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange } required></input>
    <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange } required></input>
    <input type="password" name="password" value={user.password} placeholder="Your Password"onChange={ handleChange } required ></input>
    <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange } required></input>
    <div className="button" onClick={register} >Register</div>
    <div>or</div>
    <div className="button" onClick={()=>navigate("/login")}>Login</div>
</div>
  )
}

export default Register
