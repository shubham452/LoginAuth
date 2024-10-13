import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export const signupuser= async (input) =>{
    
    try{
        const response = await axios.post('http://localhost:3000/api/signup',input);
            console.log("signed up sucessfully", response)
            return response.data;
        }
    catch(err)
    {
        console.log("error during signup", err.response ? err.response.data : err.message);
        throw new Error('Signup failed. Please try again later');
    }
    
}

export const signinuser = async(input)=>{
    try {
        const response= await axios.post('http://localhost:3000/api/Login',input)
        console.log('login successful')
        return response.data;
    } catch (err) {
        console.log("error during Login", err.response ? err.response.data : err.message);
        throw new Error('Login failed. Please try again later');
    }
}

export const forgotPassword = async(input)=>{
    try {
        const res= await axios.post('http://localhost:3000/api/ForgotPassword',input)
        console.log('forgot password successful')
        return res.data;
    } catch (err) {
        console.log("error during credential recovery", err.response ? err.response.data : err.message);
        throw new Error("credential recovery failed")
    }
}

export const resetPassword = async(password,token)=>{

    try {
        const res= await axios.post(`http://localhost:3000/api/resetPassword/${token}`,{password})
        console.log('reset password successful')
        return res.data;
    } catch (err) {
        console.log("error during reset", err.response ? err.response.data : err.message);
        throw new Error("password recovery failed")
    }
}

