import React from 'react';

function LoginInputBox(props) {
    return (
        <p>
            <span style={{width: "100px", display: "inline-block"}}>
                {props.name}: 
            </span>
            <input type={ props.password ? "password" : "text"} value={props.value} onChange={props.onChange}/>
        </p>
    )
}

export default LoginInputBox;