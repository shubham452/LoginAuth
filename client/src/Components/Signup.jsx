import React, { useState } from "react";
import "../../src/App.css";
import axios from "axios";
import { signupuser } from "./api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response= await signupuser(input);
      console.log(response);
      if(response)
      {
        navigate('/Login')
      }
      
    } catch (error) {
      console.log('Sign up error: ', error)
    }

  };
  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={input.username}
          placeholder="username"
          onChange={(e) => {
            handleInput(e);
          }}
        />

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

        <button type="submit">Sign up</button>
        <p>Already a user? <Link to='/Login'>Login</Link></p>
        
      </form>
    </div>
  );
};

export default Signup;
