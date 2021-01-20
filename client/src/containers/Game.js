import React, {useEffect, useState} from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import MapView from './MapView';
import AttackView from './AttackView'
import {FindUserByName,UsersQuery} from "../FetchData"
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'

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
    },[loading])
    console.log(data)
    return (
        <>
            <Redirect from="/" to="/login" />
            <Route exact path="/login">
                <Link to="/map">login</Link>
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
                <div><Link to="/map">return</Link></div>
                <div>Backpack not implement yet!!</div>
            </Route>
        </>
    );
}
