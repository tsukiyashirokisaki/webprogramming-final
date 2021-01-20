import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

function ConditionalLink(props) {
    return (
        (props.condition) ? (
            <Link to={props.to}>
                {props.content}
            </Link>
        ) : (
            <div>{props.content}</div>
        )
    )
}

export default ConditionalLink;