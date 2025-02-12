import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from "react-router-dom";
import apiRequest from '../../lib/apiRequest';

const login = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {updateUser} = React.useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const response = await apiRequest.post("/auth/login", { email, password })
      setLoading(false);

      updateUser(response.data);
      // localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/")


    } catch (error) {
      setLoading(false);
      console.log(error)
      setError(error.response.data.message)

    }

  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={loading}>Login</button>
          {error && <p>{error}</p>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default login
