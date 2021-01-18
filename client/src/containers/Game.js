import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import MapView from './MapView';
import AttackView from './AttackView'
export default function Game() {
    return (
        <>
            <Redirect from="/" to="/login" />
            <Route exact path="/login">
                <Link to="/map">login</Link>
            </Route>
            <Route exact path="/map">
                <div><Link to="/attack">attack</Link></div>
                <div><Link to="/backpack">backpack</Link></div>
                <MapView username = "Ric" size = {100} ></MapView>
            </Route>
            <Route exact path="/attack">
                <div><Link to="/map">return</Link></div>
                <AttackView></AttackView>
            </Route>
            <Route exact path="/backpack">
                <div><Link to="/map">return</Link></div>
                <div>Backpack not implement yet!!</div>
            </Route>
        </>
    );
}
