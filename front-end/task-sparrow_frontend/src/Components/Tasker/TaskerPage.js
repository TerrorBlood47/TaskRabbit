import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';



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
            <div className='w-[20%] h-[95%] bg-pink-400 ml-6 mt-2 rounded-xl flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105'>

                <div className=' h-auto w-auto overflow-hidden shadow-lg bg-yellow-300 my-12 '>
                    <img
                        className='w-17 h-17 rounded-full  p-2 top-5 left-2 bottom-5'
                        src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
                        alt='Profile'
                    />

                </div>


                <input
                    className='mt-10 text-3xl text-center text-white bg-transparent'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />




            </div>



            {/* right */}
            <div className=' w-[80%] h-[95%] m-2 bg-pink-200 rounded-xl'>


                <div className='  border-red-600 border'>

                    <div>
                        <label>Area:</label>
                        <input
                            type="text"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Role:</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Minimum Wage Per Hour:</label>
                        <input
                            type="number"
                            value={minWagePerHour}
                            onChange={(e) => setMinWagePerHour(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className=' overflow-y-scroll border border-red-500 h-60'>
                    <p>task Offers</p>
                    {Array.isArray(tasks) && tasks.map((task, index) => (
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

                            <button className=' bg-green-400 m-1' onClick={() => handleAccept(task.taskId)}>Accept</button>
                            <button className=' bg-red-500 m-1' onClick={() => handleReject(task.taskId)}>Reject</button>
                        </div>
                    ))}
                </div>


                <div className=' overflow-y-scroll border border-red-500 h-60'>
                    <p>Accepted Tasks</p>
                    {Array.isArray(acceptedTasks) && acceptedTasks.map((task, index) => (
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

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskerPage
