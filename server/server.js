import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./Routes/UserRoute.js"
import { errorHandler } from './middlewares/errorMiddlewares.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


connectDB();

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.use("/api/users", userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running in: http://localhost:${PORT}`));