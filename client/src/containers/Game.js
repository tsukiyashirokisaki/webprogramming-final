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
    const [mikatahp,setMikatahp] = useState([])
    var { loading, error, data ,refetch} = useQuery(FindUserByName,{variables:{name:name},
        pollInterval: 500})
    useEffect(()=>{
        if (!loading && data!==undefined){
            setBackpack(data.findUserByName.backpack)
        }
    },[])
    useEffect(()=>{
        if (backpack!==undefined){
            var emptyarr = []
            for (var i=0;i<backpack.length;i++){
                emptyarr.push(backpack[i].hp)
            }
            setMikatahp(emptyarr)
        }

    },[backpack])

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
                <AttackView name={name} backpack={backpack}setBackpack={setBackpack} mikatahp={mikatahp} setMikatahp={setMikatahp}></AttackView>
            </Route>
            <Route exact path="/backpack">
                <BackpackView name={name} backpack={backpack} setBackpack={setBackpack} mikatahp={mikatahp} setMikatahp={setMikatahp}/>
            </Route>
        </>
    );
}
