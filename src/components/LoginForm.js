import React, {useState} from 'react';
import axios from 'axios';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': '79c62e75-79e3-48c2-bc3a-a1e36e9d292d',
            'User-Name': username,
            'User-Secret': password
        };
        try {
            console.log('trying to login');
            await axios.get('https://api.chatengine.io/chats', {headers: authObject})
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
                    </div>
                    <h2 className={"error"} >{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;