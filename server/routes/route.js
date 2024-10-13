import express from 'express'

import {addUser,login,ForgotPassword,resetPassword, verifyUser,logout} from '../controllers/userController.js'

const router = express.Router();

router.post('/signup',addUser)
        .post('/Login',login)
        .post('/ForgotPassword',ForgotPassword)
        .post('/resetPassword/:token',resetPassword)
        .get('/auth/verify',verifyUser)
        .get('/auth/logout',logout)


export default router;