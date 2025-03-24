
import Tour from "../models/Tour.js"
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken'
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.Admin_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Sign the token with email and password (concatenated) as you originally intended
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//create a new tour
export const createTour = async (req, res) => {

    const { title, city, address, distance, desc, price, maxGroupSize, reviews, featured } = req.body;
    const imageFile = req.file;

    // Check if the required fields are present
    if (!title || !city || !address || !distance || !desc || !price || !maxGroupSize) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Check if the file is provided
    if (!imageFile) {
        return res.status(400).json({ success: false, message: "No image file provided" });
    }

    try {
        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const tourData = {
            title,
            city,
            address,
            photo: imageUrl,  // Using the uploaded image URL
            distance,
            desc,
            price,
            maxGroupSize,
            reviews,
            featured
        };

        const newTour = new Tour(tourData);

        // Save the new tour to the database
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedTour
        }); 
    } catch (err) {
        console.error(err);  
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try Again'
        });
    }
};

//update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,
            {
                $set: req.body
            },
            {
                new: true
            });

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update'
        });
    }
};

//delete tour

export const deleteTour = async (req, res) => {
    const { id } = req.body;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete'
        });
    }
};



//getSingleTour

export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json({
            success: true,
            message: 'Successfully found',
            data: tour,
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: 'not found'
        });
    }
};

//get all tours

export const getAllTour = async (req, res) => {
  

    try {
        const tours = await Tour.find({}).populate('reviews')
        
        res.status(200).json({ success: true,
            count: tours.length,
             message: "Successfull",
              data: tours });

    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: "not-found",
        })
    }
};

//get tour by search

export const getTourBySearch = async(req, res) => {

    const city= new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        const tours = await Tour.find({city , distance: { $gte: distance},
        maxGroupSize :{ $gte: maxGroupSize},}).populate("reviews");

        res.status(200).json({
            success:true,
            message: "Successful",
            data: tours,
        });
    }  catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message:"not found",
        });
    }
}


//get featured tours

export const getFeaturedTour = async (req, res) => {
  

  try {
      const tours = await Tour.find({featured:true}).populate("reviews").limit(8);
      
      res.status(200).json({ success: true,
           message: "Successfull",
            data: tours });

  }
  catch (err) {
      res.status(404).json({
          success: false,
          message: "not-found",
      })
  }
};

//get Tour Counts
 
export const getTourCount =async(req,res) =>{
    try{
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({success:true, data: tourCount});

    }catch(err){
        res.status(500).json({ success:false, message:"failed to fetch"});
    }
}  