import React,{useState} from 'react'
import {
	faHammer,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Services from './Services';

const HomePage = () => {

	const [serviceClicked, setServiceClicked] = useState(true)

	const handleServiceNavigation = () => {
		setServiceClicked(false);
		console.log(serviceClicked);
	}
	return (
		<div>

			{/* top navigation bar */}
			<div className='  flex justify-between h-[8vh] w-full items-baseline mt-5'>

				<div className=' text-2xl font-bold  ml-5'>
					<p>TaskSparrow</p>
				</div>

				<div className=' flex text-lg justify-between w-[30%] text-gray-400 font-bold'>
					<p>Home</p>

					<p className=' cursor-pointer ' onClick={handleServiceNavigation}>Services</p>

					<p>Reviews</p>

					<p>About</p>

					<p>Login</p>

					<p>SignUp</p>

				</div>

				<div className=' bg-black  align-right rounded-3xl h-10  w-[12vw] mr-5 '>

					<p className=' w-full h-full text-white font-bold text-lg p-1'>Become a Tasker</p>
				</div>
			</div>

			{!serviceClicked && <Services/>}

			{/* mid part + ad */}
			{serviceClicked && 
				<div className=' bg-[#ECF2FF] w-full h-[50vh]'>

				<div className=' border left w-[50%] h-full flex-col items-center justify-evenly'>
					<p className=' text-gray-400 font-bold text-lg mt-8'>Book trusted help from home tasks</p>

					<div className=' border mt-10'>
						<p className=' text-5xl font-bold'>Find your Helper and</p>
						<p className=' text-5xl font-bold'>make your life Easier</p>
					</div>

					<div className=' text-gray-400 w-[70%] border'>
						We provide you with the best professionals to help you with your
						daily tasks. From cleaning to plumbing, we have it all.
					</div>


				</div>

				<div className=' border right'>

				</div>

			</div>}

		</div>
	)
}

export default HomePage
