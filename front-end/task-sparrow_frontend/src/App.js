import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/' element = {<HomePage/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>

      </Routes>
      
    </div>
  );
}

export default App;
