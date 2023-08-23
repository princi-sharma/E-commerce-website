

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Footer, Navbar } from "../components";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Cookies from 'js-cookie';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => { 
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       let result = await fetch('https://localhost:8000/login', {
//         method: 'post',
//         body: JSON.stringify(formData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (result.status === 200) {
//         const response = await result.json();
//         console.log('Login successful:', response);

//         // Set token and other relevant data in cookies
//         Cookies.set('token', response.token); // Assuming the backend returns "token"

//         navigate('/'); // Redirect to home or another page
//       } else if (result.status === 401) {
//         console.log('Invalid email or password.');
//         setError('Invalid email or password.');
//       } else {
//         console.log('Error occurred during login.');
//         setError('Error occurred during login.');
//       }

//       setFormData({
//         email: '',
//         password: '',
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Error occurred during login.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Login</h1>
//         <hr />
//         <div className="row my-4 h-100">
//           <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//             <form onSubmit={handleLogin}>
//               <div className="my-3">
//                 <label htmlFor="floatingInput">Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="floatingInput"
//                   placeholder="name@example.com"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="my-3">
//                 <label htmlFor="floatingPassword">Password</label>
//                 <div className="password-input">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     className="form-control"
//                     id="floatingPassword"
//                     placeholder="Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                   </button>
//                 </div>
//               </div>
//               <div className="my-3">
//                 <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
//               </div>
//               <div className="text-center">
//                 <button className="my-2 mx-auto btn btn-dark" type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch('https://ecom-vr5z.onrender.com/login', {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 200) {
        const response = await result.json();
        console.log('Login successful:');
        Cookies.set('isLoggedIn', true);

        // Set token and other relevant data in cookies
        Cookies.set('token', response.token); // Assuming the backend returns "token"

        navigate('/'); // Redirect to home or another page
      } else if (result.status === 401) {
        console.log('Invalid email or password.');
      } else {
        console.log('Error occurred during login.');
      }

      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="floatingInput">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
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

export default Login;

