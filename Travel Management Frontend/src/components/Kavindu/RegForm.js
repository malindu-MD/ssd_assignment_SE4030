import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../src/Form.css';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default function RegisterUser({ }) {
  const history = useHistory();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Num, setNum] = useState('');
  const [Password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      history.push('/profile');
    }

	const query = new URLSearchParams(window.location.search);
    const user = query.get('user');

	if (user) {
		// Decode the user data and store it in localStorage
		const parsedUser = JSON.parse(decodeURIComponent(user));
  
		// Log to check the data fetched from MongoDB
		console.log("User Data from MongoDB:", parsedUser);
  
		// Store the user data in localStorage
		localStorage.setItem('userInfo', JSON.stringify(parsedUser));
  
		// Optionally, redirect to another page after storing the user data
		history.replace('/profile');  // Or any other route after saving user data
	  }


  }, [history]);

  function sendData(e) {
	e.preventDefault();  
    const NewReg = {
      Name,
      Email,
      Password,
      Num,
    };

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(Password)) {
      alert(
        'Password should contain at least one special character, one capital letter, one simple letter, one numeric character, and be at least 8 characters long.'
      );
      return 0;
    } else {
      axios.post('http://localhost:8070/Register/add', NewReg).then(() => {
          alert('success');
		  window.location.reload(); 
        }).catch((err) => {
          alert(err);
        });
    }
  }

  const getData = async (e) => {
    e.preventDefault();

    const email = document.getElementById('logemail').value;
    const pass = document.getElementById('logpass');

    if (email === '' || !email.includes('@') || !email.includes('.com')) {
      alert('Enter a valid email address');
      return false;
    } else if (pass.value === '' || pass.value === null) {
      alert('Password required');
      return false;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:8070/Register/login',
        {
          Email,
          Password,
        },
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      history.push('/profile');
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const googleLogin = () => {
    // Redirect to backend route that handles Google OAuth login
    window.location.href = "http://localhost:8070/auth/google";
  };

  return (
    <div>
      <Header />
      <div className="body1">
        <div className="info">
          <div className="container containerabc" id="container">
            <div className="form-container form-containerabc sign-up-container sign-up-containerabc">
              <form onSubmit={sendData} className="form12">
                <h1 className="h111">Create Account</h1>
                <input
                  className="inputabc"
                  type="text"
                  placeholder="Name"
                  id="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="inputabc"
                  type="email"
                  placeholder="Email"
                  id="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="inputabc"
                  type="text"
                  placeholder="Mobile"
                  id="Number"
                  onChange={(e) => setNum(e.target.value)}
                  required
                />
                <input
                  className="inputabc"
                  type="password"
                  placeholder="Password"
                  id="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="button12" type="submit">
                  Sign Up
                </button>
                <button
				onClick={googleLogin}
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    color: '#757575',
                    border: '1px solid #dcdcdc',
                    borderRadius: '5px',
                    padding: '5px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: '250px',
                    marginTop: '20px',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <img
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="Google Logo"
                    style={{
                      width: '32px',
                      height: '32px',
                      marginRight: '10px',
                    }}
                  />
                  <span>Sign up with Google</span>
                </button>
              </form>
            </div>
            <div className="form-container form-containerabc sign-in-container sign-in-containerabc">
              <form onSubmit={getData} className="form12">
                <h1 className="h111">Sign in</h1>
                <input
                  className="inputabc"
                  type="text"
                  placeholder="Email"
                  id="logemail"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="inputabc"
                  type="password"
                  placeholder="Password"
                  id="logpass"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="/forget" className="a123">
                  Forgot your password?
                </a>
                <button className="button12">Sign In</button>
                <button
				 onClick={googleLogin}
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    color: '#757575',
                    border: '1px solid #dcdcdc',
                    borderRadius: '5px',
                    padding: '5px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: '230px',
                    marginTop: '20px',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <img
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="Google Logo"
                    style={{
                      width: '32px',
                      height: '32px',
                      marginRight: '10px',
                    }}
                  />
                  <span>Sign in with Google</span>
                </button>
              </form>
            </div>
            <div className="overlay-container overlay-containerabc">
              <div className="overlay overlayabc">
                <div className="overlay-panel overlay-panelabc overlay-left overlay-leftabc">
                  <h1 className="h111">Welcome Back!</h1>
                  <p className="p123">
                    To keep connected with us please login with your personal info
                  </p>
                  <button className="button12 ghost" id="signIn" onClick={window['log']}>
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-panelabc overlay-right overlay-rightabc">
                  <h1 className="h111">Hello, Friend!</h1>
                  <p className="p123">Enter your personal details and start the journey with us</p>
                  <button className="button12 ghost" id="signUp" onClick={window['reg']}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
