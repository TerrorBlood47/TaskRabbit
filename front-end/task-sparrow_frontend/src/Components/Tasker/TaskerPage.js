import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	faHome,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import pfp from '../../Assets/zisan.jpg';



const TASKER_API = "http://localhost:8080/api/tasker";
const TASK_API = "http://localhost:8080/api/task";


const TaskerPage = () => {

    const { user, setUser } = useContext(UserContext);


    console.log("User first : ", user);

    const [taskerId, setTaskerId] = useState(0);
    const [area, setArea] = useState('');
    const [role, setRole] = useState('');
    const [minWagePerHour, setMinWagePerHour] = useState(0);
    const [phone, setPhone] = useState('');


    const [aboutClicked, setAboutClicked] = useState(false);
	const handleAboutNavigation = () => {
		setAboutClicked(false);
        setTaskOffersClicked(true);
        setAcceptedTask(true);
	}

    const [taskoffersClicked, setTaskOffersClicked] = useState(true);
    const handleTaskOffersNavigation = () => {
        setTaskOffersClicked(false);
        setAboutClicked(true);
        setAcceptedTask(true);
    }

    const [acceptedTask, setAcceptedTask] = useState([true]);
    const handleAcceptedTasksNavigation = () => {
        setAcceptedTask(false);
        setAboutClicked(true);
        setTaskOffersClicked(true);
    }

    const navigate = useNavigate();

    const handleHomeNavigation = () => {
        navigate('/');
    }
    const handleProfileNavigation = () => {
        navigate('/profile');
    }


    useEffect(() => {
        if (user && user.id) {
            fetch(`${TASKER_API}/userId/${user.id}`)
                .then(response => response.json())
                .then(tasker => {
                    console.log("fetch Tasker : ", tasker);
                    setName(user.name);
                    setTaskerId(tasker.tasker_id);
                    setArea(tasker.area);
                    setRole(tasker.role);
                    setMinWagePerHour(tasker.minWagePerHour);
                    setPhone(tasker.phoneNumber);

                    console.log("TaskerId 32112 : ", tasker.tasker_id);
                    // Fetch tasks right after taskerId is updated
                    if (tasker.tasker_id) {
                        fetch(`${TASK_API}/find/pending/${tasker?.tasker_id}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                setTasks(data)
                            })
                            .catch(error => console.error(error));

                        fetch(`${TASK_API}/find/accepted/${tasker?.tasker_id}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                setAcceptedTasks(data)
                            })
                            .catch(error => console.error(error));
                    }
                })
                .catch(error => console.error(error));
        }
    }, [user]);



    const [name, setName] = useState(user ? user.name : 'John Doe');




    const [tasks, setTasks] = useState([]);
    const [acceptedTasks, setAcceptedTasks] = useState([]);





    const handleAccept = async (taskId) => {

        try {
            const response = await axios.post(`${TASK_API}/accepted/${taskId}`);
            console.log("response : ", response);

            if (response.status === 200) {
                alert("Task accepted successfully");

                setTasks(tasks => tasks.filter(task => task.taskId !== taskId));

                fetch(`${TASK_API}/find/accepted/${taskerId}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                setAcceptedTasks(data)
                            })
                            .catch(error => console.error(error));

            }





        } catch (error) {
            console.log("catch error : ", error);
        }
    }


    const handleReject = async (taskId) => {
        try {
            const response = await axios.post(`${TASK_API}/rejected/${taskId}`);
            console.log("response : ", response);

            if (response.status === 200) {
                alert('Task rejected successfully');

                setTasks(tasks => tasks.filter(task => task.taskId !== taskId));
            }


        } catch (error) {
            console.log("catch error : ", error);
        }

    }




    return (


        <div className=' w-[100vw] h-[100vh] flex'>
            <div className='w-[20%] h-[95%] bg-gray-600 ml-6 mt-2 rounded-xl flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105'>

                <div className=' h-auto w-auto overflow-hidden'>
                    <img
                        className='w-17 h-17 rounded-full  p-2 top-5 left-2 bottom-5'
                        src={pfp}
                        alt='Profile'
                    />
                    <p className='text-20 font-calibari text-gray-200  hover:text-black cursor-pointer py-5 transform transition-transform hover:scale-105' 
                        onClick={handleAboutNavigation}>
                        About
                    </p>

                    <p className='text-20 font-calibari text-gray-200  hover:text-black cursor-pointer py-5 transform transition-transform hover:scale-105' 
                        onClick={handleTaskOffersNavigation}>
                        Task Offers
                    </p>

                    <p className='text-20 font-calibari text-gray-200  hover:text-black cursor-pointer py-5 transform transition-transform hover:scale-105' 
                        onClick={handleAcceptedTasksNavigation}>
                        Accepted Tasks
                    </p>

                    <p className='text-20 font-calibari text-gray-200  hover:text-black cursor-pointer py-5 transform transition-transform hover:scale-105' 
                        onClick={handleHomeNavigation}>
                        Home
                    </p>

                    <p className='text-20 font-calibari text-gray-200  hover:text-black cursor-pointer py-5 transform transition-transform hover:scale-105' 
                        onClick={handleProfileNavigation}>
                        Profile
                    </p>

                </div>

                
            </div>

            {!aboutClicked && (
                <div class="flex-cols items-center justify-center bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Personal Informations
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Details and informations about tasker.
                        </p>
                    </div>
                    <div class="border-t border-gray-200 flex ml-100">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {name}
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Area
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {area}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Role
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {role}
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Minimum Wage Per Hour
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {minWagePerHour} Taka
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Phone Number
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {phone}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            )}

            {!taskoffersClicked && (
                <div className=' w-[80%] h-[95%] m-2 bg-white rounded-xl '>
                    <div className=' overflow-y-scroll border  h-[100%] '>
                        <h5 class=" text-3xl leading-6 font-medium  text-gray-900">
                            Task Offers
                        </h5>
                        {Array.isArray(tasks) && tasks.map((task, index) => (
                            <div key={index} className={`m-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'} p-5 rounded-lg hover:scale-105` }>
                                <h2 className="text-xl font-semibold">{task?.title}</h2>
                                <p className="text-gray-700">{task?.description}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <p><span className="font-semibold">Wage:</span> {task?.wage}</p>
                                    <p><span className="font-semibold">Area:</span> {task?.area}</p>
                                    <p><span className="font-semibold">Date:</span> {task?.date}</p>
                                    <p><span className="font-semibold">Time of the Day:</span> {task?.time_of_the_day}</p>
                                    <p><span className="font-semibold">Duration:</span> {task?.duration}</p>
                                    <p><span className="font-semibold">Status:</span> {task?.status}</p>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => handleAccept(task.taskId)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</button>
                                    <button onClick={() => handleReject(task.taskId)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            )}

            {!acceptedTask && (
                <div className=' w-[80%] h-[95%] m-2 bg-white rounded-xl'>
                    <div className=' overflow-y-scroll border border-gray-100 h-[100%]'>
                        <h5 class=" text-3xl leading-6 font-medium  text-gray-900">
                            Accepted Tasks
                        </h5>
                        {Array.isArray(acceptedTasks) && acceptedTasks.map((task, index) => (
                            <div key={index} className={`m-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white' } hover:scale-105`}>
                                <h2 className="text-xl font-semibold">{task?.title}</h2>
                                <p className="text-gray-700">{task?.description}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <p><span className="font-semibold">Wage:</span> {task?.wage}</p>
                                    <p><span className="font-semibold">Area:</span> {task?.area}</p>
                                    <p><span className="font-semibold">Date:</span> {task?.date}</p>
                                    <p><span className="font-semibold">Time of the Day:</span> {task?.time_of_the_day}</p>
                                    <p><span className="font-semibold">Duration:</span> {task?.duration}</p>
                                    <p><span className="font-semibold">Status:</span> {task?.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskerPage
