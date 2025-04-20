import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour,
     getSingleTour, getTourBySearch, getTourCount, loginAdmin, updateTour } from "../controllers/tourController.js";


const router= express.Router();

import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

router.post('/login-admin',loginAdmin)

//create new tour
router.post("/" ,upload.single('photo'), createTour);

//update  tour
router.put("/:id" ,verifyAdmin, updateTour);

//delete tour
router.delete("/delete-tour", deleteTour);

//get single tour
router.get("/:id" , getSingleTour);

//get all tour
router.get("/" , getAllTour);

//get all tour
router.get("/search/getTourBySearch" , getTourBySearch);

//get featured tour
router.get("/search/getFeaturedTours" , getFeaturedTour);

//get tour count
router.get("/search/getTourCount" , getTourCount);



export default router;

