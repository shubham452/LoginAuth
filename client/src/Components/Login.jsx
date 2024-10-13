import React, { useState } from "react";
import "../../src/App.css";
import axios from "axios";
import { signinuser } from "./api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
      });

      axios.defaults.withCredentials = true;
      const navigate = useNavigate();
      const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(input);
        try {
          const response= await signinuser(input);
          console.log(response);
          if(response)
          {
            navigate('/home')
          }
          
        } catch (error) {
          console.log('Sign in error: ', error)
        }
    
      };
  return (
    
    <div className="sign-up-container">
      <h2>Sign in</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="email"
          onChange={(e) => {
            handleInput(e);
          }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="password"
          onChange={(e) => {
            handleInput(e);
          }}
        />

        <button type="submit">Log in</button>
        <Link to='/ForgotPassword'>Forgot password?</Link>
        <p>Don't have account? <Link to='/signup'>Sign up</Link></p>
        
      </form>
    </div>
  )
}

export default Login