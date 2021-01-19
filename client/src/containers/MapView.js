import "../App.css"
import React, { useEffect, useRef, useState,useCallback } from 'react'
import { Route, Link, Redirect,useHistory } from 'react-router-dom';

function MapView(props ) {
    const [name, setname] = useState("")
    const [monster,setmonster] = useState([])
    
    useEffect(()=>{
    
        setname(props.username)
        let initmonster = []
        for (var i=0;i<props.size;i++){
            if (Math.random()<0.1){
                initmonster.push(1)
            }
            else{
                initmonster.push(0)
            }
        }
        setmonster(initmonster)

    },[])

    const row = Math.trunc(window.screen.width/50)
    const initMat = []
    for (var i=0;i<props.size;i++){
        initMat.push(0)
    }
    const [coord, setCoord] = useState(0)
    initMat[coord] = 1
    const [matrix,setMatrix] = useState(initMat)
    initMat[coord] = 0
    let grid = Grid(props.size,matrix)
    let currmat
    const history = useHistory()
    const encounter = useCallback(() => history.push('/attack'), [history])
    
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
            
        if(keyCode === 37 ) //left
        {
            setCoord(cor => cor-1)
                        
        }
        else if(keyCode === 38) //up
        {setCoord(cor => cor-row)}
        else if(keyCode === 39) //right
        {
            setCoord(cor => cor+1)
        }
        else if(keyCode === 40) //down
        {setCoord(cor => cor+row)}
        
      }, []);

      useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
       
        return () => {
          window.removeEventListener('keydown', handleUserKeyPress);
        };
      }, [handleUserKeyPress]);

      useEffect(() => {
        currmat = initMat
        currmat[coord] = 1
        setMatrix(currmat)
        if (monster[coord]){
            console.log("monster")
            encounter()
        }
    }, [coord]);
    

      
     
    // console.log(grid)
    return <div>
        <h1>{name}'s Home</h1>
        {grid}      
        </div>
}
function GridElement(index,ischeck) {
        return <div className={ischeck?"checkbutt":"butt"} index={index} ></div>
}
function Grid(size,mat){
    const grid = []
    for (var i=0;i<size;i++){
        grid.push(GridElement(size,mat[i]))
    }
    return grid
}

export default MapView;