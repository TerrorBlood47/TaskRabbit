import { Button } from 'flowbite-react'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './Context/UserContext';


const PROFILE_API = "http://localhost:8080/api/user/profile";
const TASK_API = "http://localhost:8080/api/task";


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


    const [pendingTasks, setPendingTasks] = useState([]);
    const [acceptedTasks, setAcceptedTasks] = useState([]);


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

    }, [user]);


    const handleDeleteTask = async (taskId) => {
        try {
            const task_response = await fetch(`${TASK_API}/delete/${taskId}`, {
                method: 'DELETE'
            });

            console.log("task response delete ",task_response)

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

export default ProfilePage