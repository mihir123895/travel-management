import React, { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import TourDetails from '../TourDetails';

const Dashboard = () => {
  const [tours,setTours] = useState([])

  const [userData, setUserData] = useState(null);
    const {backendUrl,aToken} = useContext(AdminContext)

    const getTours = async () => {
        
    
        try {
          const response = await axios.get(`${backendUrl}/api/v1/tours`);
          console.log(response.data.data.length);
          setTours(response.data.data.length)  // Now you can access the data properly
        } catch (err) {
          console.error("Error fetching tours:", err);
        }
      }
    

      useEffect(()=>{
        getTours()
      },[aToken])
    
  
    
    useEffect(() => {
      // Replace with your backend API endpoint
      fetch(`${backendUrl}/api/v1/booking`) 
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data.length)
          setUserData(data.data.length);
          
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }, []);
  
    console.log(userData)


  return (
    <div className="container">
      <div className="card naruto">
        <h3>Total Bookings</h3>
        <p className="card-value">{userData}</p> {/* Pass totalBookings prop */}
      </div>
      <div className="card naruto">
        <h3>Total Tours</h3>
        <p className="card-value">{tours}</p> {/* Pass totalTours prop */}
      </div>
    </div>
  );
};

export default Dashboard;
