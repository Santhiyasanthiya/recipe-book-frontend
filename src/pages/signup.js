import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles/auth.css";
import {API} from "../config.js"

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setdisplayName] = useState("");
    const navigate = useNavigate();


    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${API}/auth/register`, {
                email,
                password,
                displayName
            });
            alert("Registration Completed. Now Login!");
            navigate("/");
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>

    
            <div className='signup-form-container p-5'>
                <form onSubmit={onSubmit}>
                    <h3 className='text-center'>Sign Up</h3>

                    <div className='mb-2'>
                        <label htmlFor="Email">Email</label>
                        <input
                         type="text" 
                         placeholder='Enter Email' 
                         className='form-control' 
                         id='email' 
                         value={email}
                         onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                        placeholder='Enter password' 
                        className='form-control' 
                        id='password'
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    
                    <div className='mb-2'>
                        <label htmlFor="displayname">Display-name</label>
                        <input
                         type="text" 
                         placeholder='Enter display-name' 
                         className='form-control' 
                         id='displayname' 
                         value={displayName}
                         onChange={(event) => setdisplayName(event.target.value)}/>
                    </div>

                    <div className='d-flex justify-content-center mt-2'>
                        <button 
                        type='submit'
                        className='btn btn-primary w-100'>Sign Up</button>
                    </div>
                    <p className='text-end mt-2'>
                        Already Registered <Link to="/" className='ms-2'>Sign in</Link>
                    </p>
                </form>
            </div>
           
        </div>
    )
}