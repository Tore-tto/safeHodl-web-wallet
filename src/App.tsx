import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import User from './pages/User';

function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/Create' element={<Create/>} ></Route>
      <Route path='/Login' element={<Login/>} ></Route>
      <Route path='/User/:username' element={<User/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
