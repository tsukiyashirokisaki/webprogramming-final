import React, {useState} from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import MapView from './MapView';
export default function Game() {
    let mapSize = {row: 15, col: 25};
    let [coord, setCoord] = useState({row: 0, col: 12});
    return (
        <>
            <Redirect from="/" to="/login" />
            <Route exact path="/login">
                <Link to="/map">login</Link>
            </Route>
            <Route exact path="/map">
                <div><Link to="/attack">attack</Link></div>
                <div><Link to="/backpack">backpack</Link></div>
                <MapView username = "Ric" mapSize = {mapSize} coord={coord} setCoord={setCoord}></MapView>
                
            </Route>
            <Route exact path="/attack">
                <div>Attack not implement yet!!</div>
                <div><Link to="/map">return</Link></div>
            </Route>
            <Route exact path="/backpack">
                <div>Backpack not implement yet!!</div>
                <div><Link to="/map">return</Link></div>
            </Route>
        </>
    );
}
