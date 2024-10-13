import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });
  await newUser.save();
  return res.status(200).json({ message: "user registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "password do not match" });
  }
  const token = jwt.sign({ email: user.email }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.status(200).json({ message: "login successful" });
};

export const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const token = jwt.sign({ email: user.email }, process.env.KEY, {
      expiresIn: "1h",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shubham.sk70@gmail.com",
        pass: "icvx eaji imzc mxdp",
      },
    });

    var mailOptions = {
      from: "shubham.sk70@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error in sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const token = req.params.token;
  console.log("Token received on backend:", token);
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;
    console.log("Decoded email from token: ", email);
    const id = decoded.id;
    console.log("Decoded token ID: ", id);

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashPassword);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );
    console.log("Updated user: ", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "updated password" });
  } catch (error) {
    console.log("Error: ", error);
    return res.json("Invalid token");
  }
};

export const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded= await jwt.verify(token, process.env.KEY);
    return res.status(200).json({status:true, message:'authorized'})
  } catch (error) {
    return res.json({ status: false, message: 'unauthorized' });
  }
};

export const logout = async(req,res)=>{
  res.clearCookie('token')
  return res.json({status:true})
}
