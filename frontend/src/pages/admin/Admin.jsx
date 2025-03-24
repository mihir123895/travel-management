import React, { useContext, useEffect } from 'react'
import './admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { AdminContext } from '../../context/AdminContext'

const Admin = () => {

  const {aToken} = useContext(AdminContext)

  const navigate = useNavigate()

  const navidation = () =>{
    if(!aToken) {
      navigate('/')
    }
  }

  useEffect(()=>{
    navidation()
  },[aToken])

  return aToken && ( 
    <div className='sidebar'>
      <Sidebar />
      <div className='main-content'>
      {<Outlet />}
      </div>            
    </div>
  )
}

export default Admin