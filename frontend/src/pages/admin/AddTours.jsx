import React, { useContext, useState } from 'react';
import axios from 'axios'; // For sending requests to backend
import './addtours.css'; // Include the CSS file
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AddTours = () => {

  const {backendUrl,aToken} = useContext(AdminContext)
  console.log(backendUrl)


  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: null, // File will be stored here
    desc: '',
    price: '',
    maxGroupSize: '',
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (for image)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0], // Save the first file selected
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    // Validate required fields
    if (!formData.title || !formData.city || !formData.address || !formData.distance || !formData.photo || !formData.desc || !formData.price || !formData.maxGroupSize) {
      setError('All fields are required.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('distance', formData.distance);
      formDataToSend.append('photo', formData.photo); // For image file upload
      formDataToSend.append('desc', formData.desc);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('maxGroupSize', formData.maxGroupSize);

      const {data} = await axios.post(`${backendUrl}/api/v1/tours`, formDataToSend,{});
  
      if (data.success) {
        toast.success('Tour created successfully!');
        setFormData({
          title: '',
          city: '',
          address: '',
          distance: '',
          photo: null,
          desc: '',
          price: '',
          maxGroupSize: '',
        });
        setError('');
      }
    } catch (error) {
      toast.error(error.message); 
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Tour</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="distance">Distance:</label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxGroupSize">Max Group Size:</label>
          <input
            type="number"
            id="maxGroupSize"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create Tour</button>
      </form>
    </div>
  );
};

export default AddTours;
