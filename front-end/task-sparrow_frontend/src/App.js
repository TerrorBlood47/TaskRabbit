import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
<<<<<<< HEAD
import GetTaskerInfoPage from './Components/GetTaskerInfoPage'

=======
import Login from './Components/Login';
import SignUp from './Components/SignUp';
>>>>>>> af389c3f96f7dfbcced7f32ec5be054290a54d98

function App() {
  return (
    <div className="App">

      <Routes>

<<<<<<< HEAD
        {/* <Route path='/' element = {<HomePage/>}></Route> */}

        <Route path='/getTaskerInfo' element = {<GetTaskerInfoPage/>}></Route>
=======
        <Route path='/' element = {<HomePage/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
>>>>>>> af389c3f96f7dfbcced7f32ec5be054290a54d98

      </Routes>
      
    </div>
  );
}

export default App;
