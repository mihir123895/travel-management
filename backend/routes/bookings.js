import express from 'express'
import { cancelBooking, createBooking, deleteBooking, getAllBooking, getBooking, paymentRazorpay, verifyRazorpay } from '../controllers/bookingController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router=express.Router()

router.post("/" , createBooking);
router.get("/:id" ,verifyUser, getBooking);
router.get("/" , getAllBooking);
router.delete("/delete-booking", deleteBooking);
router.post('/payment-razorpay',paymentRazorpay)
router.post('/verifyRazorpay',verifyRazorpay)
router.put("/cancel", cancelBooking);

export default router
