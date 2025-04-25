import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import Home from '../pages/Home';
import Admin from '../pages/admin/Admin';
import Dashboard from '../pages/admin/Dashboard';
import AddTours from '../pages/admin/AddTours';
import MyTours from '../pages/admin/MyTours';
import UserBooked from '../pages/admin/UserBooked';
import LoginPage from '../pages/admin/LoginPage';
import UserBookeds from '../components/userBookings/UserBooked';
import NotFound from '../pages/NotFound'; // Import the NotFound component
import Resetpassword from '../pages/Resetpassword';


const Routers = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetpassword' element={<Resetpassword />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/user-bookings" element={<UserBookeds />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="add-tour" element={<AddTours />} />
          <Route path="my-tours" element={<MyTours />} />
          <Route path="booked-user" element={<UserBooked />} />
        </Route>

        {/* 404 Page for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
