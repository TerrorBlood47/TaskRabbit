import { Button } from 'flowbite-react'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './Context/UserContext';
import axios from 'axios';
import {
    faHammer
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PROFILE_API = "http://localhost:8080/api/user/profile";
const TASK_API = "http://localhost:8080/api/task";
const TASKER_API = "http://localhost:8080/api/tasker";


const ProfilePage = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    console.log("User : ", user);




    const [name, setName] = useState(user ? user.name : 'John Doe');
    const [profession, setProfession] = useState('Software Engineer');
    const [contact, setContact] = useState('+1 234 567 890');
    const [email, setEmail] = useState(user ? user.email : 'johndoe@example.com');
    const [location, setLocation] = useState('New York, USA');
    const [selectedFile, setSelectedFile] = useState(null);
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



                    // Clear the form
                    // setTask({
                    //     taskId : null,
                    //     title: '',
                    //     description: '',
                    //     userId: user?.id,
                    //     taskerId: '',
                    //     taskerRole: '',
                    //     wage: 0,
                    //     area: '',
                    //     date: '',
                    //     time_of_the_day: '',
                    //     duration: 0,
                    //     status: 'PENDING'
                    // });
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


    const handleLogout = () => {

        setUser(null);
        localStorage.removeItem('user');

        navigate('/');
    };

    const [imgSrc, setImgSrc] = useState('https://cdn.pixabay.com/photo/2016/11/14/04/57/woman-1822656_960_720.jpg');

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
            formData.append('contentType', selectedFile?.type);
            formData.append('profileImage', selectedFile);
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

            const profile = await profile_response.json();
            console.log("Profile : ", profile);


        } catch (error) {
            console.log("Error : ", error);
        }

    }




    return (

        <div className=' w-[100vw] h-[100vh] flex'>
            <div className='w-[20%] h-[95%] bg-pink-400 ml-6 mt-2 rounded-xl flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105'>

                <div className=' h-auto w-auto overflow-hidden shadow-lg bg-yellow-300 my-12 '>
                    <img
                        className='w-17 h-17 rounded-full  p-2 top-5 left-2 bottom-5'
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


                <input
                    className='mt-10 text-3xl text-center text-white bg-transparent'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className='mt-12 text-2xl text-center text-white bg-transparent'
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                />

                <input
                    className='mt-2 text-lg text-white bg-transparent '
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

                <input
                    className='mt-2 text-lg text-white bg-transparent'
                    value={email}
                    readOnly
                />

                <input
                    className='mt-2 text-lg text-white bg-transparent'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                {/* <div className='mt-4 flex space-x-2'>
                    <button className='px-4 py-2 rounded bg-white text-pink-400 font-bold'>Follow</button>
                    <button className='px-4 py-2 rounded bg-white text-pink-400 font-bold'>Message</button>
                </div> */}

                <Button
                    onClick={handleProfileUpdate}
                    className='mt-20 px-4 py-2 rounded bg-white text-pink-400 font-bold text-2xl'
                >
                    Update Profile
                </Button>

                <Button
                    onClick={handleLogout}
                    className='mt-10 px-4 py-2 rounded bg-white text-pink-400 font-bold text-2xl'
                >
                    Log Out
                </Button>
            </div>



            {/* right */}
            <div className=' w-[80%] h-[95%] m-2 bg-pink-200 rounded-xl'>

                <div className=' overflow-y-scroll border border-red-500 h-60'>
                    <p>task pending</p>
                    {Array.isArray(pendingTasks) && pendingTasks.map((task, index) => (
                        <div key={index} className=' m-3 bg-white'>
                            {console.log(task)}
                            <h2>{task?.title}</h2>
                            <p>{task?.description}</p>
                            <p>{task?.wage}</p>
                            <p>{task?.area}</p>
                            <p>{task?.date}</p>
                            <p>{task?.time_of_the_day}</p>
                            <p>{task?.duration}</p>
                            <p>{task?.status}</p>


                            <button className=' bg-red-500 m-1' onClick={() => handleDeleteTask(task.taskId)}>Delete Task</button>
                        </div>
                    ))}
                </div>





                <div className=' overflow-y-scroll border border-red-500 h-60'>
                    <p>task accepted</p>
                    {Array.isArray(acceptedTasks) && acceptedTasks.map((task, index) => (
                        <div key={index} className=' m-3 bg-white'>
                            {console.log(task)}
                            <h2>{task?.title}</h2>
                            <p>{task?.description}</p>
                            <p>{task?.wage}</p>
                            <p>{task?.area}</p>
                            <p>{task?.taskerRole}</p>
                            <p>{task?.date}</p>
                            <p>{task?.time_of_the_day}</p>
                            <p>{task?.duration}</p>
                            <p>{task?.status}</p>


                        </div>
                    ))}
                </div>

                <div>
                    <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type='text' placeholder='Tasker Role' value={taskerRole} onChange={(e) => setTaskerRole(e.target.value)} />
                    <input type='number' placeholder='Wage' value={wage} onChange={(e) => setWage(e.target.value)} />
                    <input type='text' placeholder='Area' value={area} onChange={(e) => setArea(e.target.value)} />
                    <input type='date' placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type='text' placeholder='Time of the Day' value={time_of_the_day} onChange={(e) => setTime_of_the_day(e.target.value)} />
                    <input type='number' placeholder='Duration' value={duration} onChange={(e) => setDuration(e.target.value)} />
                    <button onClick={handleSubmit}>Submit Task</button>
                </div>

                <div className=' overflow-y-scroll border border-red-500 h-60'>
                    <p>taskers available</p>
                    {Array.isArray(availableTaskers) && availableTaskers.map((tasker, index) => (
                        <div key={index} className=' m-3 bg-white'>
                            {console.log(tasker)}
                            <h2>{tasker?.name}</h2>
                            <p>{tasker?.area}</p>
                            <p>{tasker?.minWagePerHour}</p>
                            <p>{tasker?.phoneNumber}</p>
                            <p>{tasker?.role}</p>


                            <button className=' bg-red-500 m-1' onClick={() => handleChooseTasker(tasker?.tasker_id)}>Choose Tasker</button>
                        </div>
                    ))}
                </div>

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

        </div>


    )
}

export default ProfilePage
