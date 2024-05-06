import React from "react";
import {
	faHammer,faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import worker from '../Assets/worker_hero1.png'

const LandingPage = () => {
    return (
        <div>
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
            
            <div className='p-8 flex justify-start items-center gap-6 bg-gradient-to-r from-[#ECF2FF] to-[#FBFCFF]'>
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
            </div>
        </div>
    );
}

export default LandingPage;