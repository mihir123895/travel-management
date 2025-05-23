import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute  from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/bookings.js'
import connectCloudinary from './config/cloudinary.js'

dotenv.config();
connectCloudinary();

const app = express()
const port = process.env.PORT || 8000;

const corsOptions = {
    origin:true,
    credentials:true
}

const connectDB = async () =>{
    mongoose.connection.on("connected",()=>console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URL}/tms`)
}


app.get("/", (req, res) => {
    res.send("api is working");
})

connectDB()


//middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth" ,  authRoute);
app.use("/api/v1/tours" , tourRoute);
app.use("/api/v1/users" , userRoute);
app.use("/api/v1/review" , reviewRoute);
app.use("/api/v1/booking" , bookingRoute);

 


app.listen(port, () => {
    console.log('Server listening on Port', port);
})