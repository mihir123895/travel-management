import React, { useState, useEffect, useContext } from 'react';
import '../../pages/admin/userbooked.css';

import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const UserBooked = () => {
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const { backendUrl } = useContext(AdminContext);


 const [userDatas, setUserDatas] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDatas(parsedUser);
      console.log(parsedUser);
    }
  }, []);


  const fetchUserBookings = async (userId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/booking`);
  
      if (data.success) {
        // Filter bookings where booking.userId === the userId passed in
        const userBookings = data.data.filter(booking => booking.userId === userId);
        console.log(userBookings);
        setUserData(userBookings);
      }
  
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      toast.error('Error fetching user bookings');
    }
  };
  
  useEffect(() => {
    if (userDatas?._id) {
      fetchUserBookings(userDatas._id);
    }
  }, [userDatas]);
  

 

//   useEffect(() => {
//     // Replace with your backend API endpoint
//     fetch(`${backendUrl}/api/v1/booking`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data);
//         setUserData(data.data);
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, [backendUrl]);



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter user data based on the search query
  const filteredData = userData?.filter((item) => {
    // Search by any field you want (e.g., tourName, fullName, or userEmail)
    return (
      item.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const deleteBooking = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/v1/booking/delete-booking`,
        {
               // Send the token in the header
          data: { id },                     // Send ID in the request body
        }
      );
  
      console.log(data);
      if (data.success) {
        toast.success("Booking deleted successfully");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/booking/cancel`,
        { id } // ✅ Send ID directly as the request body
      );
  
      toast.success("Booking cancelled successfully!");
  
      if (onCancelSuccess) {
        onCancelSuccess(response.data.booking);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error.response?.data || error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };
  

  const handlePayment = async (bookingId, tourName) => {
    try {
      const response = await axios.post( `${backendUrl}/api/v1/booking/payment-razorpay`, {
        bid: bookingId,
        tName: tourName,
      });
  
      if (!response.data.success) {
        toast.error(response.data.message || "Failed to initiate payment");
        return;
      }
  
      const { order } = response.data;

        const key = "rzp_test_FYm3E7bz3KD3tw"
  
      const options = {

      

        key: key ,
      amount:order.amount,
      currency:order.currency,
      name:"Tour Payment",
      description:"Tour Payment",
      order_id:order.id,
      receipt:order.receipt,
      handler: async function (response) {
        toast.success("Payment successful!");
      
        try {
          const verifyRes = await axios.post(`${backendUrl}/api/v1/booking/verifyRazorpay`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId, // so you can mark it as paid
          });
      
          if (verifyRes.data.success) {
            toast.success("Booking paid!");
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Verify Error:", error);
          toast.error("Server error during payment verification");
        }
      }
      
      };
  
      console.log("Razorpay options:", options);
      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    }
  };
  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <div className="search-bar-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by tour name, full name, or email..."
          className="search-bar"
        />
      </div>

      <div className='card-container'>

      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div key={index} className="card naruto">
            <div className="card-header">
              <h3>{item.tourName}</h3>
            </div>
            <div className="card-body">
              <p><strong>Full Name:</strong> {item.fullName}</p>
              <p><strong>Email:</strong> {item.userEmail}</p>
              <p><strong>Guest Size:</strong> {item.guestSize}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Booking Date:</strong> {new Date(item.bookAt).toLocaleDateString()}</p>
              <p><strong>Cancelled:</strong> {item.cancelled === false ? "No" : "Yes"} </p>
              {!item.cancelled ? (
  <div>
    <p><strong>Payment:</strong> {item.payment ? "Paid" : "Cash"}</p>
  </div>
) : null}


             
            </div>

            <button className="anime-btn" onClick={() => handlePayment(item._id, item.tourName)}>
 Pay Online
</button>
<br />

            <button className="anime-btn" onClick={() => handleCancelBooking(item._id)}>
  Cancel
</button>
            
<br />

<button className="anime-btn" onClick={() => deleteBooking(item._id)}>
  Delete
</button> 
          </div>
        ))
      ) : (
        <p>No matching bookings found.</p>
      )}
      </div>
    </>
  );
};

export default UserBooked;
