import React, { useState } from "react";
import "../../src/App.css";
import axios from "axios";
import { forgotPassword } from "./api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
    
  const navigate = useNavigate();
  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response= await forgotPassword({email});
      console.log(response);
      if(response)
      {
        console.log("inside")
        alert("check your email for password recovery link")
        navigate('/Login')
      }
      
    } catch (error) {
      console.log('Sign up error: ', error)
    }

  };
  return (
    <div className="sign-up-container">
      <h2>Forgot password</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <button type="submit">Send</button>
        <p>Already a user? <Link to='/Login'>Login</Link></p>
        
      </form>
    </div>
  );
};

export default ForgotPassword;
