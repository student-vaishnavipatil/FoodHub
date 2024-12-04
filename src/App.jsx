import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar';
import Login from './Screens/Login';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Screens/Home';
import Signup from './Screens/Signup';

//Rfce -shortcut for boilerplate code
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <div>
    <Routes>
   
   <Route path='/login' element={<Login/>}/>
   <Route path='/' element={<Home/>}/>
   <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
    </Router>
    </>
  )
}

export default App
