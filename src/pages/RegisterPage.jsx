import React from 'react'
import { Link } from "react-router-dom";
import uploadImg from '../assets/addImage.png'
import  "./RegisterPage.css"

const RegisterPage = () => {
  return (
    <div className='register'>
        <div className='register_container'>
            <form >
                <input type="text" name='firstName' placeholder='First Name' required />
                <input type="text" name='lastName' placeholder='Last Name' required />
                <input type="email" name='email' placeholder='Email Id' required/>
                <input type="password" name='password' placeholder='Password' required/>
                <input type="password" name='cPassword' placeholder='Confirm Password' required/>
                <input id='image' type="file" name='profileImg' accept='image/*' style={{display:"none"}} required/>
                <label htmlFor='image'>
                    <img  src={uploadImg} alt="add Profile photo" />
                    <p>Upload your Photo</p>
                </label>
                <button type='submit'>Register</button>
                <p>Already have an account? <Link to={'/login'}>Login Here</Link></p>

            </form>
        </div>

    
    </div>
  )
}

export default RegisterPage