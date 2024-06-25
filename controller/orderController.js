import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = "http://localhost:5173";

// Placing user order from frontend
// const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     if (!userId || !items || !amount || !address) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const newOrder = new orderModel({ userId, items, amount, address });
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "USD",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "USD",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 200,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  if (!orderId || typeof success === 'undefined') {
    return res.status(400).json({ success: false, message: "Order ID and success status are required" });
  }

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { verifyOrder, userOrders, listOrders, updateStatus };
