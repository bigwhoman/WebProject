import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

function RegisterForm(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [active, setActive] = useState(false);
    const [btnState,setBtnState] = useState("button");
    const defaultValues = {
        email: '',
        password: '',
        userName: '',
        verifyPassword: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required').min(8, 'Must be at least 8 characters'),
        verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
        userName: Yup.string().required('Required').matches(/^\S*$/, 'No spaces').min(3, 'Must be at least 3 characters'),
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': '79c62e75-79e3-48c2-bc3a-a1e36e9d292d',
            'User-Name': username,
            'User-Secret': password
        };
        try {
            console.log('trying to register');
            await axios.get('https://api.chatengine.io/chats', {headers: authObject})
            setError('');
            window.location.reload();
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }
    return (
        <div className={'wrapper'}>
            <div className={"form"}>
                <h1 className={"title"}>Web Chat Application</h1>
                <Formik
                    onSubmit={handleSubmit}
                    validateOnMount={true}
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                >
                    {({isValid, isSubmitting}) => {
                       setActive(isValid && !isSubmitting);
                       setBtnState(active ? "button" : "button disabled")
                       return (
                            <Form>
                                <ErrorMessage name="userName" component="h2" className={"error"}/>
                                <Field name="userName" label="User Name" className={"input"}
                                       placeholder={"Username"}/>
                                <ErrorMessage name="email" component="h2" className={"error"}/>
                                <Field name="email" label="Email" type="email" className={"input"}
                                       placeholder={"Email"}/>
                                <ErrorMessage name="password" component="h2" className={"error"}/>
                                <Field name="password" label="Password" type="password"
                                       className={"input"} placeholder={"Password"}/>
                                <ErrorMessage name="verifyPassword" component="h2" className={"error"}/>
                                <Field name="verifyPassword" label="Password" type="password" className={"input"}
                                       placeholder={"Confirm password"}/>
                                <div align={"center"}>
                                    <button type={"submit"} className={btnState
                                    } disabled={!active}>
                                        <span>Register User</span>
                                    </button>
                                    <button type={"button"} className={"button"} onClick={() => {
                                        navigate('/login');
                                    }}>
                            <span>
                                Back to login
                            </span>
                                    </button>
                                </div>
                                {/*<h2 className={"error"}>{error}</h2>*/}
                            </Form>)
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default RegisterForm;