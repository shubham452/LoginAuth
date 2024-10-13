import React, { useState } from "react";
import "../../src/App.css";
import axios from "axios";
import { resetPassword } from "./api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const {token} = useParams();
  console.log("Token from URL:", token); 
  const navigate = useNavigate();
  const handleInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response= await resetPassword(password,token);
      console.log(response);
      if(response)
      {
        console.log("inside")
        alert("password updated")
        navigate('/Login')
      }
      
    } catch (error) {
      console.log('Sign up error: ', error)
    }

  };
  return (
    <div className="sign-up-container">
      <h2>New password</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
      <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
