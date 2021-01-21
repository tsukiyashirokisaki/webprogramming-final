import React, {useEffect, useState} from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import LoginView from './loginView'
import SignupView from './signupView'
import MapView from './MapView';
import AttackView from './AttackView'
import {FindUserByName,UsersQuery} from "../FetchData"
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'
import BackpackView from './backpackView';

export default function Game(props) {
    let mapSize = {row: 15, col: 25};
    let [coord, setCoord] = useState({row: 0, col: 12});
    const [name,setName] = useState("1")
    const [backpack,setBackpack] = useState([])

    var { loading, error, data ,refetch} = useQuery(FindUserByName,{variables:{name:name}})
    useEffect(()=>{
        if (!loading && data!==undefined){
            setBackpack(data.findUserByName.backpack)
        }
    // FIX 
    // [loading, refetch]
    },[])

    return (
        <>
            <Redirect from="/" to="/login" />
            <Route exact path="/login">
                <LoginView setName={setName} setBackpack={setBackpack}/>
                
            </Route>
            <Route exact path="/signup">
                <SignupView setName={setName} setBackpack={setBackpack}/>
            </Route>
            <Route exact path="/map">
                <div><Link to="/attack">attack</Link></div>
                <div><Link to="/backpack">backpack</Link></div>
                <MapView username = {name} mapSize = {mapSize} coord={coord} setCoord={setCoord}></MapView>
            </Route>
            <Route exact path="/attack">
                <div><Link to="/map">return</Link></div>
                <AttackView name={name} backpack={backpack}setBackpack={setBackpack} refetch={refetch} ></AttackView>
            </Route>
            <Route exact path="/backpack">
                <BackpackView name={name} backpack={backpack} setBackpack={setBackpack}/>
            </Route>
        </>
    );
}
