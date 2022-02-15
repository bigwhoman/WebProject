import React, { useState } from 'react';
import axios from 'axios';
import { authentication } from '../service/firebase';
import firebase from 'firebase/compat/app';
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import google from '../assets/google.svg';

function LoginForm(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': '48976808-5efd-4187-ba29-b91b6909a58f',
            'User-Name': username,
            'User-Secret': password,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        };

        try {
            console.log('trying to login');
            await axios.get('https://api.chatengine.io/chats', { headers: authObject })
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            setError('');
            window.location.reload();
        } catch (error) {
            console.log(error.message);
            setError('Invalid username or password');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }
    return (
        <div className={'wrapper'}>
            <div className={"form"}>
                <h1 className={"title"}>Web Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                        placeholder={"Username"}
                        className={"input"}
                        required
                    />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder={"Password"}
                        className={"input"}
                        required
                    />
                    <div align={"center"}>
                        <button type={"submit"} className={"button"}>
                            <span>Start Chatting</span>
                        </button>
                        <button type={"button"} className={"button"} onClick={() => {
                            navigate('/register');
                        }}>
                            <span>
                                Register
                            </span>
                        </button>
                        <button type="button" className="button" onClick={() => {
                            authentication.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
                        }} style={{ justifyContent: "center", alignItems: "center" }}>
                            <img src={google} alt="google" width="10%" /> Sign In With Google !
                        </button>
                    </div>
                    <h2 className={"error"}>{error}</h2>
                </form>
            </div >
        </div >
    );
}

export default LoginForm;