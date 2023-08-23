
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userName,
      email,
      password,
      confirmPassword,
      phone,
      age,
      gender,
    };

    const validationErrors = validateFormData(formData);

    if ((validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        let result = await fetch('https://ecom-vr5z.onrender.com/signup', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();
        console.warn('user registered',result);
      //  Cookies.remove('isLoggedIn');
      Cookies.set('token', result.token);
      Cookies.set('isLoggedIn', true);
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const validateFormData = (data) => {
    const errors = {};
    if (!data.userName.trim()) {
      errors.userName = 'Username is required.';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required.';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!data.age.trim()) {
      errors.age = 'Age is required.';
    }
    if (!data.gender) {
      errors.gender = 'Gender is required.';
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
            <div className="form my-3">
  <label htmlFor="userName">Username</label>
  <input
    type="text"
    className="form-control"
    id="userName"
    placeholder="Enter Your Name"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
  />
  {errors.userName && <div className="error-message">{errors.userName}</div>}
</div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className="form my-3">
                <label htmlFor="Phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="Phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </div>
              <div className="form my-3">
                <label htmlFor="Age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="Age"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && (
                  <div className="error-message">{errors.age}</div>
                )}
              </div>
              <div className="form my-3">
                <label htmlFor="Gender">Gender</label>
                <select
                  className="form-control"
                  id="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <div className="error-message">{errors.gender}</div>
                )}
              </div>
              
              
              <div className="form my-3">
  <label htmlFor="password">Password</label>
  <div className="password-input">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>
  {errors.password && <div className="error-message">{errors.password}</div>}
</div>
<div className='form my-3'>
  <label htmlFor='confirmPassword'>Confirm Password</label>
  <div className="password-input">
    <input
      type="password"
      name="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </div>
  {password && confirmPassword && password !== confirmPassword && (
    <div className="error-message">Passwords do not match.</div>
  )}
</div>
              <div className="my-3">
                <p>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

