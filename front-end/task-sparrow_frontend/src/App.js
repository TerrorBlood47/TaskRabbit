import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, Profiler } from 'react';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import UserContext from './Components/Context/UserContext';
import ProfilePage from './Components/ProfilePage';
import GetTaskerInfoPage from './Components/Tasker/GetTaskerInfoPage';
import TaskerPage from './Components/Tasker/TaskerPage';


function App() {

    const [user, setUser] = useState(null);

    // Load user data from localStorage when the app is loaded
    useEffect(() => {
        const userData = localStorage.getItem('user');
        console.log('User data:', userData);
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);



    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>

                <Routes>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/get/info/tasker" element={<GetTaskerInfoPage/>} />
                    <Route path="/tasker" element={<TaskerPage/>} />

                </Routes>
            </UserContext.Provider>

        </div>
    );
}

export default App;
