import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    password: "",
    email: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo here

    // Form validation and API call
    try {
      const response = await fetch("http://localhost:5000/api/CreateUser", {
        method: "POST", // Corrected "METHOD" to "method"
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
          location: credentials.location,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        alert("Signup successful!");
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
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={credentials.name}
              name="name"
              onChange={onChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Address</label>
            <input
              type="text"
              name="location"
              value={credentials.location}
              className="form-control"
              id="location"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/login" className="btn btn-danger">Already have an account?</Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
