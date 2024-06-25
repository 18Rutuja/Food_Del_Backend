import express from "express"
import authMiddleware from "../middlewares/auth.js" 
import { userOrders, verifyOrder,listOrders,updateStatus } from "../controller/orderController.js"

const orderRouter = express.Router();

// orderRouter.post("/place" , authMiddleware , placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder )
orderRouter.post("/userorders" , authMiddleware , userOrders)
orderRouter.get("/list" , listOrders);
orderRouter.post("/status" , updateStatus)

export default orderRouter;