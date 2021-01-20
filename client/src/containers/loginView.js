import React, { useState } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import LoginInputBox from '../components/loginInputBox';
import ConditionalLink from '../components/conditionalLink'

// import bcrypt from 'bcrypt'

const saltrounds = 10



function LoginView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const isLoginValid = () => {
        console.log(password);
        console.log('abc123');
        if (username === "Ric" && password === 'abc123') {
            return true;
        }
        else return false;
    }

    return (
        <>
            <div style={{
                width: "600px",
                height: "300px",
                margin: "-150px 0 0 -300px",
                position: "absolute",
                top: "50%",
                left: "50%",
                textAlign: "center"
            }}>
                <h1 textAlign>Pokémon</h1>
                <LoginInputBox name="Username" value={username} onChange={handleUsernameInput} password={false} />
                <LoginInputBox name="Password" value={password} onChange={handlePasswordInput} password={true} />
                <ConditionalLink to="/map" condition={isLoginValid()} content={<button>Login / Create user</button>} />
            </div>
        </>
    )
}

export default LoginView;