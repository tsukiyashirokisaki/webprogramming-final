import React, {useState} from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import LoginView from './loginView'
import MapView from './MapView';
import AttackView from './AttackView'
export default function Game() {
    let mapSize = {row: 15, col: 25};
    let [coord, setCoord] = useState({row: 0, col: 12});
    return (
        <>
            <Redirect from="/" to="/login" />
            <Route exact path="/login">
                <LoginView />
            </Route>
            <Route exact path="/map">
                <div><Link to="/attack">attack</Link></div>
                <div><Link to="/backpack">backpack</Link></div>
                <MapView username = "Ric" mapSize = {mapSize} coord={coord} setCoord={setCoord} />
            </Route>
            <Route exact path="/attack">
                <div><Link to="/map">return</Link></div>
                <AttackView />
            </Route>
            <Route exact path="/backpack">
                <div><Link to="/map">return</Link></div>
                <div>Backpack not implement yet!!</div>
            </Route>
        </>
    );
}
