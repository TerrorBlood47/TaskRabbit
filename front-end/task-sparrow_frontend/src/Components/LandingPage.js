import React from "react";
import {
	faHammer,faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import worker from '../Assets/worker_hero1.png'
import worker2 from '../Assets/worker_hero2.png'
import worker3 from '../Assets/worker_hero3.png'
import worker4 from '../Assets/worker_hero4.png'



const LandingPage = () => {
    return (
        <div>
            <div className=' p-8 flex justify-center items-center gap-6 bg-gradient-to-r from-[#ECF2FF] to-[#FBFCFF]' >
                
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
                            <div class="h-40 bg-gray-400 rounded-lg" style={{ backgroundImage: `url(${worker2})` }}></div>
                            <div class="flex flex-col items-start mt-4">
                                <h4 class="text-xl font-semibold">Cleaning</h4>                                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
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

                        <div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
                            <div class="h-40 bg-gray-400 rounded-lg" style={{ backgroundImage: `url(${worker3})` }}></div>
                            <div class="flex flex-col items-start mt-4">
                                <h4 class="text-xl font-semibold">Painting</h4>                                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span>Paint walls, ceilings, molding, and doors; includes prep and cleanup.</span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span>Now Trending: Color blocking, stripe details, and statement colors.</span>
                                </li>
                            </ul>
                            </div>
                        </div>

                        <div class="flex flex-col bg-gray-200 rounded-lg p-4 m-2">
                            <div class="h-40 bg-gray-400 rounded-lg" style={{ backgroundImage: `url(${worker4})` }}></div>
                            <div class="flex flex-col items-start mt-4">
                                <h4 class="text-xl font-semibold">Home Repairs</h4>                                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span>Home improvements like plumbing, electrical, and appliance installation.</span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span>Now Trending: Chandeliers, brass faucets, and smart toilets.</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;