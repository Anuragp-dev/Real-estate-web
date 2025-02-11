import React from 'react'
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from '../../lib/apiRequest';

const register = () => {

    const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError("");

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {

            const response = await apiRequest.post("/auth/register", { username, email, password })

            navigate("/login")


        } catch (error) {
            console.log(error)
            setError(error.response.data.message)

        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={loading} >Register</button>
                    {error && <p>{error}</p>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default register