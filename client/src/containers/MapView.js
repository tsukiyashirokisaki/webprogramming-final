import "../App.css"
import React, { useEffect, useRef, useState,useCallback } from 'react'
function MapView(props ) {
    const [name, setname] = useState("")
    const [cor, setcor] = useState(0)
    useEffect(()=>{
        setname(props.username)
    },[])
    function getResolution() {
        alert("Your screen resolution is: " + window.screen.width + "x" + window.screen.height);}
    // getResolution()
    const initmat = []
    for (var i=0;i<props.size;i++){
        initmat.push(0)
    }
    initmat[cor] = 1
    const [mat,setmat] = useState(initmat)
    let grid = Grid(props.size,mat)
    const escFunction = useCallback((event) => {
        switch(event.keyCode){
            case 37: //left
                if(cor[0]>0){
                    setcor([cor[0]-1,cor[1]])
                }
                break
            case 38: //up
                break
            case 39: //right
                break
            case 40: //down
                break
        }
      }, []);
    
      useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
      }, []);
    console.log(grid)
    return <div>
        <h1>{name}' Home</h1>
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