import "../App.css"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';

function MapView(props) {
    const [name, setname] = useState("")
    const [monster, setmonster] = useState([])

    useEffect(() => {
        setname(props.username)
        let initmonster = []
        for (var i = 0; i < props.size; i++) {
            if (Math.random() < 0.1) {
                initmonster.push(1)
            }
            else {
                initmonster.push(0)
            }
        }
        setmonster(initmonster)

    }, [])

    const row = Math.trunc(window.screen.width / 50)
    const initmat = []
    for (var i = 0; i < props.size; i++) {
        initmat.push(0)
    }
    const [cor, setcor] = useState(0)
    initmat[cor] = 1
    const [mat, setmat] = useState(initmat)
    initmat[cor] = 0
    let grid = Grid(props.size, mat)
    let currmat
    const history = useHistory()
    const encounter = useCallback(() => history.push('/attack'), [history])

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;

        if (keyCode === 37) //left
        {
            setcor(cor => cor - 1)

        }
        else if (keyCode === 38) //up
        { setcor(cor => cor - row) }
        else if (keyCode === 39) //right
        {
            setcor(cor => cor + 1)
        }
        else if (keyCode === 40) //down
        { setcor(cor => cor + row) }

    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    useEffect(() => {
        currmat = initmat
        currmat[cor] = 1
        setmat(currmat)
        if (monster[cor]) {
            console.log("monster")
            encounter()
        }
    }, [cor]);




    // console.log(grid)
    return <div>
        <h1>{name}'s Home</h1>
        {grid}

    </div>
}
function GridElement(index, ischeck) {
    return <div className={ischeck ? "checkbutt" : "butt"} index={index} ></div>
}
function Grid(size, mat) {
    const grid = []
    for (var i = 0; i < size; i++) {
        grid.push(GridElement(size, mat[i]))
    }
    return grid
}

export default MapView;