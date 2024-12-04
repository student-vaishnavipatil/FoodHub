import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom';

const Login = () => {
let navigate=useNavigate(true);
  const [credentials, setCredentials] = useState({

    password: "",
    email: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo here

    // Form validation and API call
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST", // Corrected "METHOD" to "method"
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          password: credentials.password,
          email: credentials.email
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("autToken",json.authToken);
        console.log(localStorage.getItem("autToken"));
       navigate("/")
      }

      
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred while signing up. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            className="form-control"
            id="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/signup" className="btn btn-danger">Don't have an account?</Link>
      </form>
    </div>
  )
}

export default Login
