import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserDetailsHeader from './UsersDetailsHeader';

const WelcomeMessagePage = () =>
  (
    <div className="image">
      <Navigation about='About us' contact='Contact us' sign='Log in' whereTo="/signin" />
      <div className='welcome-message-container'>
        <h1>Welcome to HelloBooks</h1>
        <p className='welcome-message'>
          Your platform to up to date books.<br />
            You can borrow, and read <br />
              books online.
        </p>
        <div className='welcome-container-div-button'>
          <button className='welcome-container-button' data-action='sign-up-form'>
            <Link to='/signin'> Sign up</Link>
          </button>
          <Link to='/signup'>
            <button className='welcome-container-button'><p>sign up with</p>
              <img
                width="30"
                height="30"
                alt="google fonts"
                src='https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300'
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
export default WelcomeMessagePage;
