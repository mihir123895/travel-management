import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
    },
    tourName:{
         type:String,
         required:true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize :{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
     bookAt:{
        type:Date,
      required:true,
    },
    payment:{
      type:Boolean,
      default:false
    },
    cancelled:{
      type:Boolean,
      default:false
    }, 
    receiptId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
