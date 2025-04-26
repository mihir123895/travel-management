import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
import razorpay from "razorpay";


export const createBooking= async(req,res) =>{
    const newBooking = new Booking(req.body)
    try
    {

        const savedBooking= await newBooking.save();
        res.status(200).json({success:true,message:'Your tour is booked',
         data:savedBooking})


    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'internal server error'})
    }
}

//get single booking
export const getBooking = async(req,res) =>{
    const id=req.params.id

    try{
        const book= await Booking.findById(id)
        res.status(200).json({success:true,message:'successful',
         data:book});
    } catch(err){
        console.log(err);
        res.status(404).json({success:false,message:'not found'})
    }
    };


    //get all booking
export const getAllBooking = async(req,res) =>{
    
    try{
        const books= await Booking.find();
        res.status(200).json({success:true,message:'successful',
         data:books});
    } catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'internal server error'})
    }
    }
   

    const razorpayInstance = new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET

    })


    export const paymentRazorpay = async (req, res) => {
        try {
          const { bid, tName } = req.body;
      
          const bookingData = await Booking.findById(bid);
          const tourData = await Tour.findOne({ title: tName });
      
          if (!bookingData || !tourData || bookingData.cancelled) {
            return res.json({ success: false, message: "Tour or Booking not found or cancelled" });
          }
      
          const amount = tourData.price * 100 * bookingData.guestSize;
      
          const receipt = `receipt_${bid}`; // Make a unique receipt
      
          const options = {
            amount,
            currency: process.env.CURRENCY,
            receipt: receipt,
          };
      
          const order = await razorpayInstance.orders.create(options);
      
          // 🔥 Save the receipt to the booking so you can match it later
          bookingData.receiptId = receipt;
          await bookingData.save();
      
          res.json({ success: true, order });
        } catch (error) {
          console.error("Payment Error:", error);
          res.status(500).json({ success: false, message: error.message });
        }
      };
      
      
    //api to verify payment of razorpay
    export const verifyRazorpay = async (req, res) => {
        try {
          const { razorpay_order_id } = req.body;
      
          // Fetch order details from Razorpay
          const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
      
          if (orderInfo.status === "paid") {
            // Update the booking using the receipt, which you set as bookingId earlier
            await Booking.findOneAndUpdate({ receiptId: orderInfo.receipt }, { payment: true });


      
            res.json({ success: true, message: "Payment Successful" });
          } else {
            res.json({ success: false, message: "Payment Failed" });
          }
        } catch (error) {
          console.error("Verification Error:", error);
          res.json({ success: false, message: error.message });
        }
      };
      
    export const deleteBooking = async (req, res) => {
        const { id } = req.body; // make sure you're destructuring correctly
      
        try {
          const deletedBooking = await Booking.findByIdAndDelete(id);
      
          if (!deletedBooking) {
            return res.status(404).json({
              success: false,
              message: 'Booking not found',
            });
          }
      
          res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: deletedBooking,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: 'Something went wrong',
          });
        }
      };

export const cancelBooking = async (req, res) => {
  const {id} = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({  success: false, message: "Booking not found" });
    }

    // Update the booking to cancelled
    booking.cancelled = true;
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while cancelling booking" });
  }
};


    

