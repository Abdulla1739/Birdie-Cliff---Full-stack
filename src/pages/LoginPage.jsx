import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='login'>
      <div className="login_content">
        <form className="login_content_form">
          <input type="email" placeholder='Email Id' required />
          <input type="password" placeholder='Password' required />
          <button type='submit'>Log In</button>
        </form>
        <p>Don't Have account? <Link to={'/register'}>Sign Up Here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
