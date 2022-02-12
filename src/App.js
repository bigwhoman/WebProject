import './App.css';
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Main from "./components/Main";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;
