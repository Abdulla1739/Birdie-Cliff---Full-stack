import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CreateListing from './pages/CreateListing'


function App() {


  return (
    <>
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/create-listing' element={<CreateListing/>}/>
    </Routes>
    

    </>
  )
}

export default App