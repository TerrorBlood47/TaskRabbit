import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import UserContext from '../Context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const TASKER_API = "http://localhost:8080/api/tasker";

const GetTaskerInfoPage = () => {

    const { user } = useContext(UserContext);

    const [area, setArea] = useState('');
    const [role, setRole] = useState('');
    const [minWagePerHour, setMinWagePerHour] = useState(0);
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleHomeNavigation = () => {
        navigate('/');
    }


    useEffect(() => {
        if (!user) {
            alert('Please login first');
            navigate('/login');
            return;
        }
    }, []);

    const addTaskerInfo = async () => {

        console.log('user : ', user);

        if (user) {
            try {

                console.log('role : ', role);
                console.log('area : ', area);
                console.log('minWagePerHour : ', minWagePerHour);
                console.log('phone : ', phone);

                if (role === '' || area === '' || minWagePerHour === 0 || phone === '') {
                    alert('Please fill up all the fields');
                } else {
                    const TaskerRequest = {
                        area: area,
                        role: role,
                        minWagePerHour: minWagePerHour,
                        phoneNumber: phone,
                        userId: user?.id,
                    };

                    console.log('TaskerRequest : ', TaskerRequest);

                    const taskerResponse = axios.post(`${TASKER_API}/add`, TaskerRequest);

                    console.log(taskerResponse);

                    if ((await taskerResponse).status === 200) {
                        alert('Tasker Info added successfully');

                        navigate('/tasker');

                    }
                }

            } catch (error) {
                console.log("error : ", error);
            }
        } else {
            alert('Please login first');
        }
    }


    return (
        <div className=' w-full h-full overflow-x-hidden overflow-y-scroll '>
            {/* top title part */}
            <div className=' w-full h-[10vh] flex  ml-[17.5vw] items-center justify-end'>
                <p className=' text-black font-bold text-4xl py-2'>TaskSparrow</p>
                <p className="text-black font-bold text-center font-rubik text-2xl w-[100%] pl-10 cursor-pointer">
                    <FontAwesomeIcon icon={faHome} onClick={handleHomeNavigation} />
                </p>
            </div>

            <hr />

            {/* middle  */}
            <div className=' w-full h-[80vh] flex  mt-5'>
                <div className=' w-[60%] h-full flex justify-end'>
                    <img className=' w-[70%] h-[85%] m-10 right-4'
                        src='https://www.taskrabbit.com/v3/assets/_/_/_/src/becomeATaskerNew/images/hero_landing-fdeb7ef8f1a4361ec76f75d007d79546.jpg'
                        alt=''
                    />
                </div>

                {/* info box */}
                <div className=' ml-5 mt-10 h-[80vh] text-left flex-col justify-around '>
                    <div className=' flex-col'>
                        <p className=' text-5xl font-bold'>Earn money your way</p>

                        <div className=' w-[60%] '>
                            <p className=' text-gray-400 font-bold py-8 mr-5'>See how much you can make tasking on taskSparrow</p>
                        </div>


                        <div>
                            <select id="underline_select" onChange={(e) => setArea(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value='' selected>Select your area</option>
                                <option value='Mirpur'>Mirpur</option>
                                <option value='Uttara'>Uttara</option>
                                <option value='Dhanmondi'>Dhanmondi</option>
                                <option value='Rajarbagh'>Rajarbagh</option>
                            </select>
                        </div>
                        <div className='py-5'>
                            <select id="underline_select"
                                class="block py-2.5 px-0 w-full text-sm
                                    text-gray-500 bg-transparent border-0 border-b-2
                                    border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e) => setRole(e.target.value)}>
                                <option value='' selected>Select your category</option>
                                <option value='Cleaning'>Cleaner</option>
                                <option value='Plumbing'>Plumber</option>
                                <option value='Electrician'>Electrician</option>
                            </select>
                        </div>

                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                </svg>
                            </div>
                            <input type="tel" id="phone-input" value={phone} onChange={(e) => setPhone(e.target.value)} aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                        </div>
                        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>



                        <div className='py-8'>
                            <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your expected per hour amount</label>
                            <input id="default-range" type="range" min="0" max="1000" value={minWagePerHour} onChange={(e) => setMinWagePerHour(e.target.value)} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                            </input>
                            <p class="mt-2 text-2xl font-bold text-black dark:text-white py-3">Value: {minWagePerHour} Taka</p>
                        </div>


                    </div>

                    <div className=' text-center w-full mt-10'>
                        <button onClick={addTaskerInfo}
                            className=' w-full mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer'>
                            Get Started
                        </button>
                    </div>

                </div>
            </div>


            {/* footer */}



        </div>
    )
}

export default GetTaskerInfoPage
