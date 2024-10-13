import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import {db} from './db/db.js'
import { addUser } from './controllers/userController.js';
import router from './routes/route.js'
import cookieParser from 'cookie-parser';
dotenv.config()
  
const app = express()
const PORT=process.env.PORT||3000

//middlewares
app.use(express.json()); 
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials:true
}));
app.use(cookieParser())
app.use('/api', router)


const startServer = ()=>{
    db()
    app.listen(PORT,()=>{
        console.log("server is running")
    })
}
startServer()


