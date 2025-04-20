import Booking from "../models/Booking.js";


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


    

