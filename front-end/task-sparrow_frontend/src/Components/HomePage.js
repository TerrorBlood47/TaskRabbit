import React from 'react'
import {
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from '@mui/material';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const HomePage = () => {
  return (
    <div>

      {/* top navigation bar */}
      <div className='  flex justify-between h-[8vh] w-full items-baseline mt-5'>

        <div className=' text-2xl font-bold  ml-5'>
          <p>TaskSparrow</p>
        </div>

        <div className=' flex text-lg justify-between w-[30%] text-gray-400 font-bold'>
          <p>Home</p>

          <p>Services</p>

          <p>Reviews</p>

          <p>About</p>

          <p>Login</p>

          <p>SignUp</p>

        </div>

        <div className=' bg-black  align-right rounded-3xl h-10  w-[12vw] mr-5 '>
          
          <p className=' w-full h-full text-white font-bold text-lg p-1'>Become a Tasker</p>
        </div>
      </div>


      {/* mid part + ad */}
      <div>

        <div>
          
        </div>

      </div>

    </div>
  )
}

export default HomePage
