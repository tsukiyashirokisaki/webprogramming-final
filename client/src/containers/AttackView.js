import "./AttackView.css"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import images from "./ImageManager";
// import image from "./images/001.png"

function AttackView(props) {
    const [sel,setSel] = useState(-1)
    const pokemon =[{id:0,name:"妙蛙種子",img:require("./images/001.png").default},{id:1,name:"妙蛙草",img:require("./images/002.png").default},{id:2,name:"妙蛙花",img:require("./images/003.png").default},
    {id:3,name:"小火龍",img:require("./images/004.png").default},{id:4,name:"火恐龍",img:require("./images/005.png").default},{id:5,name:"噴火龍",img:require("./images/006.png").default}]
    const [selmonster,setSelmonster] = useState(0)
    const selmonsterstyle = {
        backgroundColor: "lightskyblue"
    }
    const [tekihp, setTekihp] = useState(100)
    const teki = {
        width: tekihp+"px"
    }
    const [mikatahp, setMikatahp] = useState(100)
    const mikata = {
        width: mikatahp+"px"
    }
    
    const tekiimg =   require("./images/010.png").default

    const handleUserKeyDown = event => {
        switch (event.key) {
            case "Left":
            case "ArrowLeft":
                if (selmonster>0){
                    setSelmonster(selmonster-1)
                }
                break;
            case "Up":
            case "ArrowUp":
                if (selmonster>=3){
                    setSelmonster(selmonster-3)
                }
                break;
            case "Right":
            case "ArrowRight":
                if (selmonster<pokemon.length-1){
                    setSelmonster(selmonster+1)
                }
                break;
            case "Down":
            case "ArrowDown":
                if (selmonster<pokemon.length-3){
                    setSelmonster(selmonster+3)
                }
                break;
            case "Enter":
                setSel(selmonster)
                break;
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyDown);
        return () => {
            window.removeEventListener('keydown', handleUserKeyDown);
        };
    }, [handleUserKeyDown]);

    
    if (sel === -1){
        return <div>
            <div class="teki">
            <img src={tekiimg}/>
          
            <div class="tekiattr">
            <table>
                <tr>
                    <td class="line25">{"妙蛙草"}</td>
                    <td class="line50"></td> 
                    <td class="line25">{"Lv 26"}</td>
                </tr>  
                
            </table>
            <table>
                <tr>
                    <td class="line25">{"HP"}</td>
                    <td class="line50" ><hr class="line" style={teki}/></td>
                    <td class="line25">{"67/67"}</td>                    
                </tr>
            </table>
            </div>
        </div>                
                <h1>選擇神奇寶貝</h1>
                <div class="mymonster">
                {pokemon.map(ele =>
                {   
                    return <div class="item" style={(ele.id===selmonster)?selmonsterstyle:{}} ><img class="sel" src={ele.img} ></img><span class="caption" >{ele.name}</span></div> })}
                </div>
                </div>
                }

    return <div class="main">
        <div class="teki">
            <img src={tekiimg}/>
            <div class="tekiattr">
            <table>
                <tr>
                    <td class="line25">{"妙蛙草"}</td>
                    <td class="line50"></td> 
                    <td class="line25">{"Lv 26"}</td>
                </tr>  
            </table>
            <table>
                <tr>
                    <td class="line25">{"HP"}</td>
                    <td class="line50" ><hr class="line" style={teki}/></td>
                    <td class="line25">{"67/67"}</td>
                    
                </tr>
            </table>
            </div>
        </div>
        <div class="mikata">
            <img src={pokemon[sel].img}/>
            <div class="mikataattr">
            <table>
                <tr>
                    <td class="line25">{"妙蛙草"}</td>
                    <td class="line50"></td> 
                    <td class="line25">{"Lv 26"}</td>
                </tr>  
                
            </table>
            <table>
                <tr>
                    <td class="line25">{"HP"}</td>
                    <td class="line50" ><hr class="line" style={mikata}/></td>
                    <td class="line25">{"67/67"}</td>
                    
                </tr>
            </table>
            </div>
        </div>
    </div>
   
}



export default AttackView;