import Grid from "../components/grid"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import { isSameCoord } from "../util";

function MapView(props) {
    var windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    var mapSize = props.mapSize; 

    const [name, setName] = useState("")
    const [monsters, setMonsters] = useState([])

    useEffect(() => {

        setName(props.username)
        let initMonster = []
        for (var i = 0; i < props.mapSize.row; ++i) {
            for (var j = 0; j < props.mapSize.col; ++j) {
                // Do not spawn a monster on the player spawn point
                if (i === props.coord.row && j === props.coord.col) continue; 
                if (Math.random() < 0.1) {
                    initMonster.push({row: i, col: j})
                }
            }
        }
        setMonsters(initMonster)

    }, [])

    const history = useHistory()
    const encounter = useCallback(() => history.push('/attack'), [history])

    const handleUserKeyDown = event => {
        switch (event.key) {
            case "Left":
            case "ArrowLeft":
                if (props.coord.col > 0) {
                    props.setCoord(rc => ({row: rc.row, col: rc.col - 1}))
                }
                break;
            case "Up":
            case "ArrowUp":
                if (props.coord.row > 0) 
                    props.setCoord(rc => ({row: rc.row - 1, col: rc.col}))
                break;
            case "Right":
            case "ArrowRight":
                if (props.coord.col < props.mapSize.col - 1) 
                    props.setCoord(rc => ({row: rc.row, col: rc.col + 1}))
                break;
            case "Down":
            case "ArrowDown":
                if (props.coord.row < props.mapSize.row - 1) 
                    props.setCoord(rc => ({row: rc.row + 1, col: rc.col}))
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyDown);

        return () => {
            window.removeEventListener('keydown', handleUserKeyDown);
        };
    }, [handleUserKeyDown]);
    
    useEffect(() => {
        for (var monster of monsters) {
            if (isSameCoord(props.coord, monster)) encounter()
        }
    }, [handleUserKeyDown]);


    let edgeLength = Math.trunc((windowSize.width < windowSize.height) ? 
                                 windowSize.width / props.mapSize.col : windowSize.height / props.mapSize.row);
    return <div>
        <div id={'title'}><h1>{name}'s Home</h1></div>
        <div>
            <Grid id={'map'} mapSize={props.mapSize} coord={props.coord} edgeLength={40}/>
        </div>
    </div>
}


export default MapView;