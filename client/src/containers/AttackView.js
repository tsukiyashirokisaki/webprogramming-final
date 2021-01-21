import "./AttackView.css"
import React, { useEffect,  useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import cursor from "./images/cursor.png"
import {FindUserByName,UsersQuery} from "../FetchData"
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'
// import Data from "./data/pokemons_data.json"
// import skill from "./data/pokemons_skill.json"


function AttackView(props) {
    const [sel,setSel] = useState(-1)
    // const mypokemon = [{id:20,lv:10,hp:[20,20],exp:300},{id:13,lv:15,hp:[30,30],exp:500},{id:14,lv:30,hp:[300,300],exp:6000}]
    var backpack = []
    var idstring

    for (var i=0;i<props.backpack.length;i++){
        idstring = props.backpack[i].pokIndex+""
        while (idstring.length<3){
            idstring = "0"+idstring
        }
        backpack.push({...props.backpack[i],img: require("./images/"+idstring+".png").default})
    }
    console.log(backpack)
    


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
    const tekipoke = {name:"火恐龍",img:require("./images/004.png").default,lv:"26",hp:[87,87]}
    const history = useHistory()
    const escape = useCallback(() => history.push('/map'), [history])
    const [useskill,setUseskill] = useState(0)
    var skills =[]
    if ( backpack[sel]!== undefined && backpack.length>0){
            for(var i=0;i<backpack[sel].skills.length;i++){
                skills[i] = backpack[sel].skills[i]
            }
            for (i;i<4;i++){
                skills[i] = {name:""}
            }
        }
        console.log(skills)
   
    const handleUserKeyDown = event => {
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
                if (selmonster<backpack.length-1 && sel === -1){
                    setSelmonster(selmonster+1)
                }
                else if (option < 3 && sel !== -1 && option+1<props.backpack[sel].skills.length){
                    setOption(option+1)
                }
                break;
            case "Down":
            case "ArrowDown":
                if (selmonster<backpack.length-3 && sel === -1 ){
                    setSelmonster(selmonster+3)
                }
                else if (option<2 && sel !== -1 && option+2<props.backpack[sel].skills.length){
                    setOption(option+2)
                }
                break;
            case "Enter":
                if (sel === -1){
                    setSel(selmonster)
                }
                else if (useskill){
                    console.log(skills[option])
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
                        {backpack.map((ele,ind) =>
                        {   
                        return <div class="item" style={(ind===selmonster)?selmonsterstyle:{}} ><img class="sel" src={ele.img} ></img><span class="caption" >{ele.name}</span></div> })}
                    </div>
                </div>
                    }

    return <div class="main">
        {tekiview}     
        <div class="mikata">
            <img src={backpack[sel].img}/>
            <div class="mikataattr">
            <table>
                <tr>
                    <td class="line25">{backpack[sel].name}</td>
                    <td class="line50"></td> 
                    <td class="line25">{"Lv "+Math.trunc(backpack[sel].cp)}</td>
                </tr>                
                <tr>
                    <td class="line25">{"HP"}</td>
                    <td class="line50" ><hr class="line" style={mikata}/></td>
                    <td class="line25">{backpack[sel].hp+"/"+backpack[sel].maxHp}</td>                    
                </tr>
            </table>
            </div>
            <div class="option">
                <table>
                      
                        
                    <tr>
                        <td class="line15">{option===0?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? skills[0].name:"攻擊"} </td>
                        <td class="line15">{option===1?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? skills[1].name:"抓"}</td>                        
                    </tr>
                    <tr>
                        <td class="line15">{option===2?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? skills[2].name:"更換怪獸"}</td>
                        <td class="line15">{option===3?<img class="cursor" src={cursor} ></img>:null}</td>
                        <td class="line35">{useskill? skills[3].name:"逃跑"}</td> 
                    </tr>
                     
                </table>
            </div>
        </div>
    </div>
   
}



export default AttackView;