import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app comfig

const app = express();
const PORT = 4000;


//middleware

app.use(express.json());
app.use(cors());


// db connection 
connectDB();

// api endpoints

app.use("/api/food" , foodRouter)
app.use("/images" , express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",  cartRouter)
app.use("/api/order", orderRouter)


app.get("/" ,(req , res) =>{
   res.send("Hellow World me aa gya I LOVE HAPPINESS");
})

app.listen( PORT ,() =>{
     console.log(`server started on port ${PORT}`);
})

//mongodb+srv://greatstack:9209304687@cluster0.vrdd2t3.mongodb.net/?