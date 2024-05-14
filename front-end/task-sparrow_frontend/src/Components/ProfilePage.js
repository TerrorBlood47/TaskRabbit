import { Button } from 'flowbite-react'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './Context/UserContext';
import axios from 'axios';
import {
    faHammer, faSearch, faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PROFILE_API = "http://localhost:8080/api/user/profile";
const TASK_API = "http://localhost:8080/api/task";
const TASKER_API = "http://localhost:8080/api/tasker";


const ProfilePage = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    console.log("User : ", user);




    const [name, setName] = useState(user ? user.name : '');
    const [profession, setProfession] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [location, setLocation] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgSrc, setImgSrc] = useState('https://cdn.pixabay.com/photo/2016/11/14/04/57/woman-1822656_960_720.jpg');
    const [taskerId, setTaskerId] = useState(null);


    const [pendingTasks, setPendingTasks] = useState([]);
    const [acceptedTasks, setAcceptedTasks] = useState([]);

    const [availableTaskers, setAvailableTaskers] = useState([]);


    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskerRole, setTaskerRole] = useState('');
    const [wage, setWage] = useState(0);
    const [area, setArea] = useState('');
    const [date, setDate] = useState('');
    const [time_of_the_day, setTime_of_the_day] = useState('');
    const [duration, setDuration] = useState(0);

    const [searchClicked, setSearchClicked] = useState(true);
    const handleSeraachNavigation = () => {
        setSearchClicked(false);
        setMoreClicked(true);
    }

    const [moreClicked, setMoreClicked] = useState(false);
    const handleMoreNavigation = () => {
        setMoreClicked(false);
        setSearchClicked(true);
    }



    const handleSubmit = (e) => {
        //e.preventDefault();
        // Submit the form

        const req = {
            taskId: null,
            title: title,
            description: description,
            userId: user?.id,
            taskerId: null,
            taskerRole: taskerRole,
            wage: wage,
            area: area,
            date: date,
            time_of_the_day: time_of_the_day,
            duration: duration,
            status: 'PENDING'
        }

        console.log("task request ", req);

        if (req.userId !== null && req.status === 'PENDING') {
            axios.post(`${TASK_API}/create`, req)
                .then(response => {
                    console.log('Task created:', response.data);

                    // setTask(response.data);
                    setCurrentTaskId(response.data.taskId);

                    let role = response.data.taskerRole;

                    console.log("role : ", role);

                    fetch(`${TASKER_API}/role/${role}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log("available taskers : ", data)
                            setAvailableTaskers(data)
                        })
                        .catch(error => console.error(error));



                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            console.log("task not submitted");
        }

    };


    const handleChooseTasker = (taskerId) => {
        console.log('Tasker ID:', taskerId);

        console.log("current task id : ", currentTaskId);

        axios.post(`${TASK_API}/update?taskId=${currentTaskId}&taskerId=${taskerId}`)
            .then(response => {
                console.log('Task updated:', response.data);
                setCurrentTaskId(null);
                setAvailableTaskers([]);
                setTaskerRole('');
                setTitle('');
                setDescription('');
                setWage(0);
                setArea('');
                setDate('');
                setTime_of_the_day('');
                setDuration(0);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };




    useEffect(() => {
        fetch(`${PROFILE_API}/get/${user?.id}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Data : ", data);
                setName(user.name || 'John Doe');
                setEmail(user.email);
                setProfession(data.profession || 'Software Engineer');
                setContact(data.contact || '+1 234 567 890');
                setLocation(data.address || 'New York, USA');
                setSelectedFile(data.profileImage || null);
                
                if (data.profileImage) {
                    downloadProfileImage(user?.id);
                }

            })
            .catch(error => console.error(error));

        if (user && user.id) {
            fetch(`${TASKER_API}/userId/${user?.id}`)
                .then(response => response.json())
                .then(tasker => {
                    console.log("fetch Tasker : ", tasker);
                    setTaskerId(tasker.tasker_id);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            fetch(`${TASK_API}/find/pending/user/${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setPendingTasks(data)
                })
                .catch(error => console.error(error));

            fetch(`${TASK_API}/find/accepted/user/${user?.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAcceptedTasks(data)
                })
                .catch(error => console.error(error));
        }
    }, [user]); // Dependencies array is here


    const handleDeleteTask = async (taskId) => {
        try {
            const task_response = await fetch(`${TASK_API}/delete/${taskId}`, {
                method: 'DELETE'
            });

            console.log("task response delete ", task_response)

            if (!(task_response.status === 200)) {
                const message = await task_response.text();
                throw new Error(`HTTP error! status: ${task_response.status}, message: ${message}`);
            }

            const newTasks = pendingTasks.filter(task => task.taskId !== taskId);
            setPendingTasks(newTasks);

        } catch (error) {
            console.log("Error : ", error);
        }
    }


    const uploadProfileImage = async (imageFile) => {
            const formData = new FormData();
            formData.append('image', imageFile);
        
            try {
                console.log('Uploading image... user id : ', user?.id);
                const response = await axios.post(`${PROFILE_API}/upload/image/${user?.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
        
                if (response.status === 200) {
                    // The image was uploaded successfully
                    // The response data is the updated profile
                    const profile = response.data;
                    console.log('Profile:', profile);
                } else {
                    // The server responded with a status other than 200
                    console.error('Error uploading image:', response);
                }
            } catch (error) {
                // An error occurred while uploading the image
                console.error('Error uploading image:', error);
            }
    };

    const downloadProfileImage = async (userId) => {
        try {
            const response = await fetch(`${PROFILE_API}/download/image/${userId}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImgSrc(imageUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };


    const handleLogout = () => {

        setUser(null);
        localStorage.removeItem('user');

        navigate('/');
    };


    //image set

    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImgSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            setImgSrc('');
        }
    };


    const handleProfileUpdate = async () => {

        try {
            const formData = new FormData();
            formData.append('userId', user?.id);
            formData.append('isTasker', false);
            formData.append('contact', contact);
            formData.append('profession', profession);
            formData.append('address', location);
            formData.append('longitude', 0);
            formData.append('latitude', 0);


            const profile_response = await fetch(`${PROFILE_API}/update`, {
                method: 'POST',
                body: formData
            });


            if (!profile_response.ok) {
                const message = await profile_response.text();
                throw new Error(`HTTP error! status: ${profile_response.status}, message: ${message}`);
            }

            if (selectedFile) {
                uploadProfileImage(selectedFile);
            }

            const profile = await profile_response.json();
            console.log("Profile : ", profile);


        } catch (error) {
            console.log("Error : ", error);
        }

    }




    return (

        <div className=' w-[100vw] h-[100vh] flex'>
            <div className=' w-[20%] h-[95%] bg-gray-600 ml-6 mt-2 rounded-xl flex flex-col items-center justify-start shadow-lg transform transition-transform hover:scale-105'>
                <div className='flex justify-between items-center py-5 r'>
                    <div className='hover:underline cursor-pointer text-white'>
                        <p onClick={handleSeraachNavigation}> Search</p>
                    </div>
                    <div className='ml-5 hover:underline cursor-pointer text-white'>
                        <p onClick={handleMoreNavigation}> More</p>
                    </div>
                </div>
                <div > 
                    <div className=' max-w-[17vw] max-h-[20vh] overflow-hidden mt-5 flex justify-center items-center'>
                        <img
                            className='w-[85%] h-[85%] rounded-full  p-2 left-2 right-2'
                            src={imgSrc}
                            alt='Profile'
                            onClick={() => document.getElementById('imageInput').click()}
                        />
                        <input
                            id='imageInput'
                            type='file'
                            hidden
                            onChange={handleImageChange}
                        />

                    </div>
                    <div className='mt-12 flex-cols justify-between items-center'>
                        <div>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <p>Name</p>
                                </span>
                                <input
                                    variant = "standard"
                                    label = "Standard"
                                    className='text-center text-lg text-white bg-transparent bd=1w-full border-b border-gray-700 focus:border-gray-300 px-2 outline-none'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <p>Role</p>
                                </span>
                                <input
                                    variant = "standard"
                                    label = "Standard"
                                    className='text-center text-lg text-white bg-transparent bd=1w-full border-b border-gray-700 focus:border-gray-300 px-2 outline-none'
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <p>Mobile</p>
                                </span>
                                <input
                                    variant = "standard"
                                    label = "Standard"
                                    className='text-center text-lg text-white bg-transparent bd=1w-full border-b border-gray-700 focus:border-gray-300 px-2 outline-none'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <p>Email</p>
                                </span>
                                <input
                                    variant = "standard"
                                    label = "Standard"
                                    className='text-center text-lg text-white bg-transparent bd=1w-full border-b border-gray-700 focus:border-gray-300 px-2 outline-none'
                                    value={email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <p>Email</p>
                                </span>
                                <input
                                    variant = "standard"
                                    label = "Standard"
                                    className='text-center text-lg text-white bg-transparent bd=1w-full border-b border-gray-700 focus:border-gray-300 px-2 outline-none'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>    
                </div>    

                <Button
                    onClick={handleProfileUpdate}
                    className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                    >
                    Update Profile
                </Button>

                <Button
                    onClick={handleLogout}
                    className="mr-10 mt-3 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                >
                    <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                </Button>
            </div>
            



            {/* right */}
            { !moreClicked && (
            <div className=' w-[80%] h-[95%] m-2 bg-white rounded-xl '>
                
                <div className='flex justify-end mb-5'>
                {
                    !taskerId && (
                        <button
                            className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                            type="button"
                            onClick={() => navigate('/get/info/tasker')}
                        >
                            <FontAwesomeIcon icon={faHammer} className="mr-2" />
                            Become a Tasker
                        </button>
                    )
                }

                {
                    taskerId && (
                        <div>
                            <button
                                className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                                type="button"
                                onClick={() => navigate('/tasker')}
                            >
                                Tasker Dashboard
                            </button>
                        </div>
                    )
                }
                </div>
                <h5 class=" text-3xl bg-blue-100 py-10 leading-6 font-medium  text-gray-900">
                    Task Offers
                </h5>
                <div className=' overflow-y-scroll border mt-5  h-60'>
                    
                    {Array.isArray(pendingTasks) && pendingTasks.map((task, index) => (
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
                                <button onClick={() => handleDeleteTask(task.taskId)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Delete Task
                                </button>
                                
                            </div>
                        </div>
                    ))}
                </div>



                <h5 class=" text-3xl leading-6 font-medium bg-blue-100 py-10  text-gray-900 mt-5">
                    Task Accepted
                </h5>

                <div className='mt-10 overflow-y-scroll h-60'>
                    {Array.isArray(acceptedTasks) && acceptedTasks.map((task, index) => (
                        <div key={index} className={`m-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'} p-5 rounded-lg hover:scale-105` }>
                            <h2 className="text-xl font-semibold">{task?.title}</h2>
                            <p className="text-gray-700">{task?.description}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <p><span className="font-semibold">Wage:</span> {task?.wage}</p>
                                <p><span className="font-semibold">Area:</span> {task?.area}</p>
                                <p><span className="font-semibold">Role:</span> {task?.taskerRole}</p>
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

            {!searchClicked && (
            <div className=' w-[80%] h-[95%] m-2 bg-white rounded-xl '>
                <div className='flex justify-end mb-5'>
                {
                    !taskerId && (
                        <button
                            className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                            type="button"
                            onClick={() => navigate('/get/info/tasker')}
                        >
                            <FontAwesomeIcon icon={faHammer} className="mr-2" />
                            Become a Tasker
                        </button>
                    )
                }

                {
                    taskerId && (
                        <div>
                            <button
                                className="mr-10 px-5 py-3 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer"
                                type="button"
                                onClick={() => navigate('/tasker')}
                            >
                                Tasker Dashboard
                            </button>
                        </div>
                    )
                }
                </div>
                <div className="max-w-md mx-auto bg-gray-100 border border-transparent rounded-lg px-4 py-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='text' placeholder=' ' value={title} onChange={(e) => setTitle(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='text' placeholder=' ' value={description} onChange={(e) => setDescription(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group text">
                        <select placeholder=' ' value={taskerRole} onChange={(e) => setTaskerRole(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                            <option value='' selected>Select Tasker Role</option>
                            <option value='Cleaning'>Cleaner</option>
                            <option value='Plumbing'>Plumber</option>
                            <option value='Electrician'>Electrician</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='text' placeholder='' value={wage} onChange={(e) => setWage(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group text">
                        <select value={area} onChange={(e) => setArea(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                            <option value='' selected>Select Area</option>
                            <option value='Mirpur'>Mirpur</option>
                            <option value='Uttara'>Uttara</option>
                            <option value='Dhanmondi'>Dhanmondi</option>
                            <option value='Rajarbagh'>Rajarbagh</option>
                        </select>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type='date' placeholder=' ' value={date} onChange={(e) => setDate(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type='time' placeholder=' ' value={time_of_the_day} onChange={(e) => setTime_of_the_day(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='number' placeholder=' ' value={duration} onChange={(e) => setDuration(e.target.value)} className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration</label>
                    </div>

                    
                    <button onClick={handleSubmit}
                    className='mt-5 px-2 py-2 text-white border border-transparent rounded-full bg-black outline-none transition-all duration-400 hover:bg-indigo-200 hover:text-black text-lg font-semibold tracking-wide cursor-pointer'
                    >
                        Submit Task
                    </button>
                </div>

                <h5 class=" text-3xl leading-6 font-medium bg-blue-100 py-10  text-gray-900 mt-5">
                    Available Taskers
                </h5>

                <div className='mt-10 overflow-y-scroll h-60'>
                    {Array.isArray(availableTaskers) && availableTaskers.map((tasker, index) => (
                        <div key={index} className={`m-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'} p-5 rounded-lg hover:scale-105`}>
                            <h2 className="text-xl font-semibold">{tasker?.name}</h2>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <p><span className="font-semibold">Area:</span> {tasker?.area}</p>
                                <p><span className="font-semibold">Minimum Wage per Hour:</span> {tasker?.minWagePerHour}</p>
                                <p><span className="font-semibold">Phone Number:</span> {tasker?.phoneNumber}</p>
                                <p><span className="font-semibold">Role:</span> {tasker?.role}</p>
                            </div>
                            <div className="mt-4">
                                <button onClick={() => handleChooseTasker(tasker?.tasker_id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Choose Tasker
                                </button>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}

        </div>


    )
}

export default ProfilePage
