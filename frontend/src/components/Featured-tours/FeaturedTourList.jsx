import React from 'react'
import Tourcard from '../../shared/Tourcard'
//import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from "../../hooks/useFetch"
import {BASE_URL} from "../../utils/config"
import TourCard from '../../shared/Tourcard'




const FeaturedTourList = () => {

  const {data: featuredTours,loading,error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  
  return ( 
  <>
      {
        loading && <h4>Loading....</h4>
      }
      {
        error && <h4>{error}</h4>
      }

    { 
     !loading && !error && featuredTours?.slice(0,8).map(tour =>(
      <div className="tour-card-container" key={tour._id}>
      <TourCard tour={tour} />
    </div>
    ))}
  </>
  );
};

export default FeaturedTourList
