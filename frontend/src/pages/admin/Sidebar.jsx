import React from 'react'
import { assets } from '../../assets/icons/assets'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


const Sidebar = () => {

    const menuItems = [
        {name:"Dashboard" , path:"/admin", icon:assets.home_icon},
        {name:"Add Tour" , path:"/admin/add-tour", icon:assets.add_icon},
        {name:"My Tours" , path:"/admin/my-tours", icon:assets.my_course_icon},
        {name:"booked user" , path:"/admin/booked-user", icon:assets.person_tick_icon},
        // {name:"Delete Tour" , path:"/admin/delete-tour", icon:assets.cross_icon},
     ]


  return (
    <div className='main'>
        {
            menuItems.map((item)=>(
                <NavLink key={item.name} to={item.path}  end={item.path === '/admin'} className={`links`}  >
                    <img src={item.icon} alt="" />
                    <p>{item.name}</p>
                </NavLink>
            ))
        }
    </div>
  )
}

export default Sidebar