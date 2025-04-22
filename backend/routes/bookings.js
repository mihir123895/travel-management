import express from 'express'
import { createBooking, deleteBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router=express.Router()

router.post("/" , createBooking);
router.get("/:id" ,verifyUser, getBooking);
router.get("/" , getAllBooking);
router.delete("/delete-booking", deleteBooking);

export default router
