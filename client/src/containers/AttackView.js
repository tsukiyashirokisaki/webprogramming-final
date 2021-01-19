import "./AttackView.css"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import cursor from "./images/cursor.png"
import data from "./data/pokemons_data.json"
import skill from "./data/pokemons_skill.json"
function AttackView(props) {
    const [sel,setSel] = useState(-1)
    const mypokemon = [{id:20,lv:10,hp:[20,20],exp:300},{id:13,lv:15,hp:[30,30],exp:500},{id:14,lv:30,hp:[300,300],exp:6000}]
    const pokemon = mypokemon.map(ele => data[ele.id])
    var idstring
    useEffect(()=>{
        for (var i=0;i<mypokemon.length;i++){
            idstring = mypokemon[i].id+""
            while (idstring.length<3){
                idstring = "0"+idstring
            }
            pokemon[i].img =  require("./images/"+idstring+".png").default
            pokemon[i].lv = mypokemon[i].lv
            pokemon[i].hp = mypokemon[i].hp
            console.log(pokemon[i].hp)
            pokemon[i].exp = mypokemon[i].exp
        }
    },[])
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
    const [option,setOption] = useState(0)
    const tekipoke =   {name:"火恐龍",img:require("./images/004.png").default,lv:"26",hp:[87,87]}
    const history = useHistory()
    const escape = useCallback(() => history.push('/map'), [history])
    const [useskill,setUseskill] = useState(0)
    
    const handleUserKeyDown = event => {
        // console.log(event.key)
        switch (event.key) {
            case "Left":
            case "ArrowLeft":
                if (selmonster>0 && sel===-1){
                    setSelmonster(selmonster-1)
                }
                else if (option>0 && sel!==-1){
                    setOption(option-1)
                }
                break;
            case "Up":
            case "ArrowUp":
                if (selmonster>=3 && sel===-1){
                    setSelmonster(selmonster-3)
                }
                else if (option>=2 && sel!==-1){
                    setOption(option-2)
                }
                break;
            case "Right":
            case "ArrowRight":
                if (selmonster<pokemon.length-1 && sel === -1){
                    setSelmonster(selmonster+1)
                }
                else if (option < 3 && sel !== -1){
                    setOption(option+1)
                }
                break;
            case "Down":
            case "ArrowDown":
                if (selmonster<pokemon.length-3 && sel === -1){
                    setSelmonster(selmonster+3)
                }
                else if (option<2 && sel !== -1){
                    setOption(option+2)
                }
                break;
            case "Enter":
                if (sel === -1){
                    setSel(selmonster)
                }
                else{
                    switch(option){
                        case 0:
                            setUseskill(1)
                            break;
                        case 1:
                            break;
                        case 2:
                            setSel(-1)
                            break;
                        case 3:
                            escape()
                            break;
                    }
                }

                break;
            case "Backspace":
                setUseskill(0)
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyDown);
        return () => {
            window.removeEventListener('keydown', handleUserKeyDown);
        };
    }, [handleUserKeyDown]);
    const tekiview = <div class="teki">
                        <img src={tekipoke.img}/>
                        <div class="tekiattr">
                        <table class="attack-table">
                            <tr>
                                <td class="line25">{tekipoke.name}</td>
                                <td class="line50"></td> 
                                <td class="line25">{"Lv "+tekipoke.lv}</td>
                            </tr>  
                            <tr>
                                <td class="line25">{"HP"}</td>
                                <td class="line50" ><hr class="line" style={teki}/></td>
                                <td class="line25">{tekipoke.hp[0]+"/"+tekipoke.hp[1]}</td>
                            </tr>
                        </table>
                        </div>
                    </div>
    
    if (sel === -1){
        return <div>
                    {tekiview}                           
                    <h1>選擇神奇寶貝</h1>
                    <div class="mymonster">
                        {pokemon.map((ele,ind) =>
                        {   
                        return <div class="item" style={(ind===selmonster)?selmonsterstyle:{}} ><img class="sel" src={ele.img} ></img><span class="caption" >{ele.name}</span></div> })}
                    </div>
                </div>
                    }

    return <div class="main">
        {tekiview}     
        <div class="mikata">
            <img src={pokemon[sel].img}/>
            <div class="mikataattr">
            <table>
                <tr>
                    <td class="line25">{pokemon[sel].name}</td>
                    <td class="line50"></td> 
                    <td class="line25">{"Lv "+pokemon[sel].lv}</td>
                </tr>                
                <tr>
                    <td class="line25">{"HP"}</td>
                    <td class="line50" ><hr class="line" style={mikata}/></td>
                    <td class="line25">{pokemon[sel].hp[0]+"/"+pokemon[sel].hp[1]}</td>                    
                </tr>
            </table>
            </div>
            <div class="option">
                <table>
                    <tr>
                        <td class="line15">{option===0?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? pokemon[sel].skill[0]:"攻擊"} </td>
                        <td class="line15">{option===1?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? pokemon[sel].skill[1]:"抓"}</td>                        
                    </tr>
                    <tr>
                        <td class="line15">{option===2?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? pokemon[sel].skill[2]:"更換怪獸"}</td>
                        <td class="line15">{option===3?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? pokemon[sel].skill[3]:"逃跑"}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
   
}



export default AttackView;