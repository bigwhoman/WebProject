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
            projectID={"79c62e75-79e3-48c2-bc3a-a1e36e9d292d"}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps)=> <ChatFeed {...chatAppProps}/>}
        />
    );
}

export default Main;