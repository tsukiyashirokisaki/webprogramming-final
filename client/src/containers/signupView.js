import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginInputBox from '../components/loginInputBox';

import { useMutation } from '@apollo/client'
import { SignUp } from "../FetchData"

function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signingUp, setSigningUp] = useState(false);
    const history = useHistory()
    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const [signUp, { loading }] = useMutation(SignUp, {
        onError: (err) => {
            console.log(err);
            alert("Username already exists. Please pick another username.")
            setSigningUp(false);
        },
        onCompleted: (data) => {
            props.setName(data.signIn.name);
            props.setBackpack(data.signIn.backpack);
            setUsername("");
            setPassword("");
            history.push('/map');
        }
    })
    
    useEffect(() => {
        let vars = {
            name: username,
            password: password
        }
        if (username === "" && password === "") console.log('guarded')
        else if (signingUp && username !== "" && password !== "") {
            signUp ({
                variables: vars
            })
        }
    }, [signingUp])

    const handleSignUp = async () => {
        // console.log(typeof password)
        if (!loading) setSigningUp(true);
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
                <h1>Pokémon</h1>
                <h2>Sign Up</h2>
                <LoginInputBox name="Username" value={username} onChange={handleUsernameInput} password={false} />
                <LoginInputBox name="Password" value={password} onChange={handlePasswordInput} password={true} />
                <button onClick={handleSignUp}>Sign Up</button>
                <div><Link to="/login">Already has an account? Log In</Link></div>

            </div>
        </>
    )
}



export default LoginView;