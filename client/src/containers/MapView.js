import "../App.css"
import React, { useEffect, useRef, useState,useCallback } from 'react'
function MapView(props ) {
    const [name, setname] = useState("")
    useEffect(()=>{
        setname(props.username)
    },[])
    const row = Math.trunc(window.screen.width/50)
    const initmat = []
    for (var i=0;i<props.size;i++){
        initmat.push(0)
    }
    const [cor, setcor] = useState(0)
    initmat[cor] = 1
    const [mat,setmat] = useState(initmat)
    initmat[cor] = 0
    let grid = Grid(props.size,mat)
    let currmat
    console.log(mat)            
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        console.log(cor)
            
        if(keyCode === 37 ) //left
        {
            setcor(cor => cor-1)
                        
        }
        else if(keyCode === 38) //up
        {setcor(cor => cor-row)}
        else if(keyCode === 39) //right
        {
            setcor(cor => cor+1)
        }
        else if(keyCode === 40) //down
        {setcor(cor => cor+row)}
        
        
        
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
    }, [cor]);
    

      
     
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