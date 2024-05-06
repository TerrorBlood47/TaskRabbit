import React,{useState} from 'react'
import {
	faHammer,faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";

// image imports
import logos from '../Assets/logo.png'
import worker from '../Assets/worker_hero1.png'


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

				<button
					className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
					type="button"
					>
					<FontAwesomeIcon icon={faHammer} className="mr-2" />
					Become a Tasker
				</button>

			</div>

			{!serviceClicked && <Services/>}

			{/* mid part + ad */}
			{serviceClicked && <div>
				<div className=' p-8 flex justify-start items-center gap-6 bg-gradient-to-r from-[#ECF2FF] to-[#FBFCFF]' >
					
					<div className=' w-[50%] px-8 flex-col items-start justify-start'>
						<p className="text-gray-700 font-bold text-center font-rubik text-2xl w-[100%] py-10">
							<FontAwesomeIcon icon={faHammer}/> Book trusted help for home tasks
						</p>

						<h2 className="w-[100%] text-black font-poppins font-bold text-5xl text-center flex items-center">
							Find your Helper and make your life Easier
						</h2>
						<p className="w-475 my-8 text-gray-700 font-rubik text-lg leading-relaxed font-semibold">
							We provide you with the best professionals to help you with your
							daily tasks. From cleaning to plumbing, we have it all.
						</p>
					</div>
					<div className="w-[50%] md:w-[40%] text-center justify-center">
                
						<div className="flex items-center bg-white rounded-full shadow-md p-2">
							<input
								type="text"
								className="flex-1 border-none py-2 px-4 text-lg rounded-full outline-none"
								style={{ fontSize: '1.1rem', width: '100%'}}
								placeholder="Search..."
							/>
							<button className="bg-black text-white border-none outline-none cursor-pointer py-2 px-4 rounded-full ml-2 hover:bg-indigo-200 transition-colors duration-300" 
								onClick={() => {/* handle search action */}}>
									<FontAwesomeIcon icon={faSearch} />
							</button>
						</div>
            		</div> 
					
				</div>
				<div>
					<div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
						<div className="max-w-xl mx-auto lg:max-w-screen-xl">
							<div className="mb-16 lg:max-w-lg lg:mb-0">
							
								<ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
									<li class="flex items-center space-x-3 rtl:space-x-reverse">
										<svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
										</svg>
										<span>Assemble or disassemble furniture items by unboxing, building, and any cleanup.</span>
									</li>
									<li class="flex items-center space-x-3 rtl:space-x-reverse">
										<svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
										</svg>
										<span>Now Trending: Curved sofas, computer desks, and sustainable materials.</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
							<img
							src={worker}
							className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
							alt=""
							/>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-center w-screen min-h-screen p-10">
					
					<div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 max-w-6xl">
						<div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
							<div class="h-40 bg-gray-400 rounded-lg"></div>
							<div class="flex flex-col items-start mt-4">
								<h4 class="text-xl font-semibold">Heading</h4>
								<p class="text-sm">Some text about the thing that goes over a few lines.</p>
								<a class="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs uppercase" href="#">Click
									Here</a>
							</div>
						</div>
						<div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
							<div class="h-40 bg-gray-400 rounded-lg"></div>
							<div class="flex flex-col items-start mt-4">
								<h4 class="text-xl font-semibold">Heading</h4>
								<p class="text-sm">Some text about the thing that goes over a few lines.</p>
								<a class="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs uppercase" href="#">Click
									Here</a>
							</div>
						</div>
						<div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
							<div class="h-40 bg-gray-400 rounded-lg"></div>
							<div class="flex flex-col items-start mt-4">
								<h4 class="text-xl font-semibold">Heading</h4>
								<p class="text-sm">Some text about the thing that goes over a few lines.</p>
								<a class="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs uppercase" href="#">Click
									Here</a>
							</div>
						</div>
						<div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
							<div class="h-40 bg-gray-400 rounded-lg"></div>
							<div class="flex flex-col items-start mt-4">
								<h4 class="text-xl font-semibold">Heading</h4>
								<p class="text-sm">Some text about the thing that goes over a few lines.</p>
								<a class="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs uppercase" href="#">Click
									Here</a>
							</div>
						</div>
					</div>
				</div>

				<footer class="bg-white dark:bg-gray-900">
					<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
						<div class="md:flex md:justify-between">
						<div class="mb-6 md:mb-0">
							<a href="https://tasksparrow.com/" class="flex items-center">
								<img src={logos} class="h-20 me-3" alt="FlowBite Logo" />
								<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TaskSparrow</span>
							</a>
						</div>
						<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
							<div>
								<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
								<ul class="text-gray-500 dark:text-gray-400 font-medium">
									<li class="mb-4">
										<a href="https://flowbite.com/" class="hover:underline">About</a>
									</li>
									
								</ul>
							</div>
							<div>
								<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
								<ul class="text-gray-500 dark:text-gray-400 font-medium">
									<li class="mb-4">
										<a href="https://github.com/zisan23" class="hover:underline ">Github</a>
									</li>
									<li>
										<a href="https://www.facebook.com/profile.php?id=100012051467690" class="hover:underline">Facebook</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
								<ul class="text-gray-500 dark:text-gray-400 font-medium">
									<li class="mb-4">
										<a href="#" class="hover:underline">Privacy Policy</a>
									</li>
									<li>
										<a href="#" class="hover:underline">Terms &amp; Conditions</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<div class="sm:flex sm:items-center sm:justify-between">
						<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
						</span>
						<div class="flex mt-4 sm:justify-center sm:mt-0">
							<a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
								<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
										<path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
									</svg>
								<span class="sr-only">Facebook page</span>
							</a>
							<a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
										<path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
									</svg>
								<span class="sr-only">Discord community</span>
							</a>
							<a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
									<path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
								</svg>
								<span class="sr-only">Twitter page</span>
							</a>
							<a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
								</svg>
								<span class="sr-only">GitHub account</span>
							</a>
							<a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
								</svg>
								<span class="sr-only">Dribbble account</span>
							</a>
						</div>
					</div>
					</div>
				</footer>



			</div>}

		</div>
	)
}

export default HomePage
