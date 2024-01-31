import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { IoIosArrowDropdown } from "react-icons/io"
// For location
import { useLocation } from 'react-router-dom'
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { FaShoppingCart } from "react-icons/fa";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'

// const subLinks = [
//   {
//       title: "python",
//       link:"/catalog/python"
//   },
//   {
//       title: "web dev",
//       link:"/catalog/web-development"
//   },
// ];
const Navbar = () => {
 //use useSelector for using slices
 const {token} = useSelector( (state) => state.auth );
 const {user} = useSelector( (state) => state.profile );
 const {totalItems} = useSelector( (state) => state.cart )

 const fetchSublinks=async()=>{
  try {
    // categories ka endpoint->categoriesapi
    const result= await apiConnector("GET", categories.CATEGORIES_API)
    console.log("priting sublinks result",result);
    setSubLinks(result.data.data)
    
  } catch (error) {
    console.log('couldnot fetch catalog list');
  }
}


 //api call
 const [subLinks,setSubLinks]=useState([]);
 useEffect(()=>{
  fetchSublinks();
 })

 const location=useLocation(0)
  //agar match kr gye to return krega ye obj
  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
  }





  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
    <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
      {/* Image */}
      <Link to='/'>
        <img src={logo} alt='logo' width={160} height={42}/>

      </Link>

   

      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25 '>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
           <div className='  relative group flex items-center gap-x-2'>
            <p>{link.title}</p>
            <IoIosArrowDropdown />
                                 <div className=' invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[50%] 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]  z-10'>

                                <div className='  absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 '>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`${subLink.link}`} key={index}>
                                                    <p>{subLink.title}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }
                                </div>

           </div>
                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                               
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


  {/* login,signup,etc */}
  <div className='flex gap-x-4 items-center'>

{
    user && user?.accountType != "Instructor" && (
      
        <Link to="/dashboard/cart" className='relative'>
        <FaShoppingCart />
            {
                totalItems > 0 && (
                    <span>
                        {totalItems}
                    </span>
                )
            }
        </Link>
    )
}
{/* //for login button dikhana h ya ni */}
{
    token === null && (
        <Link to="/login">
            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                Log in
            </button>
        </Link>
    )
}
{
    token === null && (
        <Link to="/signup">
            <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                Sign Up
            </button>
        </Link>
    )
}
{
    token !== null && 
    <ProfileDropDown />
}

</div>

   
   
   
   
    </div>

    </div>
  )
}

export default Navbar