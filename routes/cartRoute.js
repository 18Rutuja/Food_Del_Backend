import express from "express"
import { getCart , addToCard , removeFromCart } from "../controller/cartController.js"
import authMiddleware from "../middlewares/auth.js";

const cartRouter  =  express.Router();

cartRouter.post("/add" ,authMiddleware, addToCard)
cartRouter.post("/remove" ,authMiddleware, removeFromCart)
cartRouter.post("/get" ,authMiddleware, getCart)



export default cartRouter;