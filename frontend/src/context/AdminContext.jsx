import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) =>{

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const deleteTour = async (id) => {
        try {
            const token = localStorage.getItem('aToken');
            if (!token) {
                toast.error('Authorization token is missing');
                return;
            }
    
            const { data } = await axios.delete(`${backendUrl}/api/v1/tours/delete-tour`, {
                headers: { aToken: token },  // Send the token in the header
                data: { id }  // Send the tour ID in the request body
            });
    
            if (data.success) {
                toast.success('Tour deleted successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
        }
    };
    
    
    
    const value ={
        aToken,backendUrl,setAToken,deleteTour
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider