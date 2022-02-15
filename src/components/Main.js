import React from 'react';
import ChatFeed from "./ChatFeed";
import {ChatEngine} from "react-chat-engine";
import {Link, Navigate, useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm";

function Main(props) {
    const navigate = useNavigate();
    if(!localStorage.getItem('username')) {
        return <LoginForm/>
    }
    return (
        <ChatEngine
            height={"100vh"}
            projectID={"48976808-5efd-4187-ba29-b91b6909a58f"}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps)=> <ChatFeed {...chatAppProps}/>}
        />
    );
}

export default Main;