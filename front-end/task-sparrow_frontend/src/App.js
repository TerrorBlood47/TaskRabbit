import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import GetTaskerInfoPage from './Components/GetTaskerInfoPage'


function App() {
  return (
    <div className="App">

      <Routes>

        {/* <Route path='/' element = {<HomePage/>}></Route> */}

        <Route path='/getTaskerInfo' element = {<GetTaskerInfoPage/>}></Route>

      </Routes>
      
    </div>
  );
}

export default App;
