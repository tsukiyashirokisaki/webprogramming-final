import "./AttackView.css"
import React, { useEffect,  useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import cursor from "./images/cursor.png"
import {FindUserByName,UsersQuery,RandomPop,AddPokByUser,UpdateCp,UpdateHp} from "../FetchData"
import {gql, useQuery, useMutation,useSubscription} from '@apollo/client'
import {ch2num,typetable} from "./data/type"

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function SumData(arr){
    var sum=0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    };
    return sum;
}
function AttackView(props) {
    const history = useHistory()
    
    const [messages,setMessages] = useState("")
    const [sel,setSel] = useState(-1)
    const [tekipoke,setTekipoke] = useState("")
    const [useskill,setUseskill] = useState(0)
    
    const [addPokByUser] = useMutation(AddPokByUser, {
        onError(error) {
            console.log(error)
    }})
    const [updateCp] = useMutation(UpdateCp, {
        onCompleted(data){
            console.log(data)
        },
        onError(error) {
            console.log(error)
    }})
    const [updateHp] = useMutation(UpdateHp, {
        onCompleted(data){
            console.log(data)
        },
        onError(error) {
            console.log(error)
    }})
    
    var { loading, error, data ,refetch} = useQuery(FindUserByName,{variables:{name:props.name}})
    useEffect(()=>{
        if (!loading && data!==undefined){
            props.setBackpack(data.findUserByName.backpack)
        }
    },[refetch])
    
    var backpack = []
    var idstring
    const [tekihp, setTekihp] = useState(100)
    const [mikatahp, setMikatahp] = useState([])
    
    const [randomPop] = useMutation(RandomPop,  {
        onCompleted(data) {
          idstring = data.randomPop.pokIndex+""
          while (idstring.length<3){
          idstring = "0"+idstring
          }
          setTekipoke({...data.randomPop,img: require("./images/"+idstring+".png").default})
          
        }})
    useEffect(()=>{
        randomPop()
        var emptyarr = []
        for (var i=0;i<Math.min(props.backpack.length,6);i++){
            emptyarr.push(props.backpack[i].hp)
        }
        setMikatahp(emptyarr)
    },[])


    for (var i=0;i<Math.min(props.backpack.length,6);i++){
        idstring = props.backpack[i].pokIndex+""
        while (idstring.length<3){
            idstring = "0"+idstring
        }
        backpack.push({...props.backpack[i],img: require("./images/"+idstring+".png").default})
    }
    const escape = useCallback(() => history.push('/map'), [history])
    const jumpout = ()=>{
        escape();
        for (var i=0;i<Math.max(6,backpack.length);i++){
            updateHp({variables:{pokId:backpack[i]._id,hp:mikatahp[i]}})
            console.log({variables:{pokId:backpack[i]._id,hp:mikatahp[i]}})
                        
        }
        
    }

    const [teki,setTeki] = useState({
        width: tekihp+"px",
    })

    const [mikata,setMikata] = useState({
        width: mikatahp[sel]+"px",
    })
    

    const [selmonster,setSelmonster] = useState(0)
    const selmonsterstyle = {
        backgroundColor: "lightskyblue"
    }
    

    useEffect(()=>{
        setTekihp(tekipoke.hp)
    },[tekipoke])
    // useEffect(()=>{
    //     if (backpack.length>0 && backpack[sel]!==undefined){
    //         setMikatahp(backpack[sel].hp)
    //     }    
    // },[sel])
    useEffect(()=>{
    setTeki({
        width:Math.trunc(tekihp/tekipoke.maxHp*100)+"px"   
    })
},[tekihp])
    useEffect(()=>{
        if (backpack[sel]!==undefined){
            setMikata( {
                width: Math.trunc(mikatahp[sel]/backpack[sel].maxHp*100)+"px",
            } )
        }
        
    },[mikatahp[sel]])
    
    
    const [option,setOption] = useState(0)
    
    var skills =[]
    if ( backpack[sel]!== undefined && backpack.length>0){
            for(var i=0;i<backpack[sel].skills.length;i++){
                skills[i] = backpack[sel].skills[i]
            }
            for (i;i<4;i++){
                skills[i] = {name:""}
            }
        }
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
                else if (useskill  && option+1<props.backpack[sel].skills.length){
                    setOption(option+1)
                }
                else if ( !useskill && option < 3 && sel !== -1){
                    setOption(option+1)
                }
                break;
            case "Down":
            case "ArrowDown":
                
                if (selmonster<backpack.length-3 && sel === -1 ){
                    setSelmonster(selmonster+3)
                }
                else if (useskill && option+2<props.backpack[sel].skills.length){
                    setOption(option+2)
                }
                else if ( !useskill && option<2 && sel !== -1 ){
                    setOption(option+2)
                }
                break;
            case "Enter":
                if (tekihp === 0){
                    jumpout()
                }
                else if (sel === -1 ){
                    setSel(selmonster)
                }
                else if (useskill){
                    var newtekihp = Math.max(0,
                        tekihp-1-Math.trunc(
                    skills[option].damage*backpack[sel].attValue/tekipoke.defValue)*(skills[option].type in backpack[sel].type?1.2:1))
                    setTekihp(newtekihp )
                    var randomnumber = getRandomInt(tekipoke.skills.length)
                    var copymikata = mikatahp
                    copymikata[sel] = Math.max(0,
                        mikatahp[sel]-1-Math.trunc(
                    tekipoke.skills[randomnumber].damage*tekipoke.attValue/backpack[sel].defValue)*(tekipoke.skills[randomnumber].type in tekipoke.type?1.2:1)
                    )
                    setMikatahp(copymikata)
                    setUseskill(0)
                    var retstr = backpack[sel].name+"使用了"+skills[option].name+" \n"+tekipoke.name+"以"+tekipoke.skills[randomnumber].name+"回擊"
                    if (copymikata[sel]===0){
                        retstr+=" "+backpack[sel].name+"失去戰鬥能力"
                    }
                    if (newtekihp===0){
                        retstr+=" "+tekipoke.name+"失去戰鬥能力"
                        // updateCp({variables:{pokId: "60088a89022aba36dcffe05b", cp: 302.20267868406205}})
                        
                        updateCp({variables:{pokId:backpack[sel]._id,cp:backpack[sel].cp+tekipoke.cp/backpack[sel].cp}})
                        console.log({pokId:backpack[sel]._id,cp:backpack[sel].cp+tekipoke.cp/backpack[sel].cp})
                        // console.log(backpack)
                    }
                    setMessages(retstr)
                    
                }
                else{
                    switch(option){
                        case 0:
                            if (mikatahp[sel]>0){
                                setUseskill(1)
                            }
                            
                            break;
                        case 1:
                            if (mikatahp[sel]>0){
                                if (Math.exp(-tekihp/tekipoke.maxHp)>Math.random()){
                                    setMessages("恭喜你抓到了~~~")
                                    addPokByUser({variables:{userName:props.name,pokId:tekipoke._id}})
                                    refetch()
                                }
                                else{
                                    setMessages("可惜，沒抓到@@")
                                }
                            }         
                            break;
                        case 2:
                            setSel(-1)
                            break;
                        case 3:
                            jumpout()
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
    const tekiview = <div className="teki">
                        
                        <img src={tekipoke.img}/>
                        <div className="tekiattr">
                        <table className="attack-table">
                            <tr>
                                <td className="line25">{tekipoke.name}</td>
                                <td className="line50"></td> 
                                <td className="line25">{"Lv "+Math.trunc(tekipoke.cp)}</td>
                            </tr>  
                            <tr>
                                <td className="line25">{"HP"}</td>
                                <td className="line50" >{tekihp>0?<hr className="line" style={teki}/>:null}</td>
                                <td className="line25">{tekihp+"/"+tekipoke.maxHp}</td>
                            </tr>
                        </table>
                        </div>
                    </div>
    const success = <div className="success" onClick={jumpout} > 離開</div>
    const optionpanel = <div className="option">
    <table>
        <tr>
            <td className="line15">{option===0?<img className="cursor" src={cursor} ></img>:null}</td>
            <td className="line35">{useskill? skills[0].name:"攻擊"} </td>
            <td className="line15">{option===1?<img className="cursor" src={cursor} ></img>:null}</td>
            <td className="line35">{useskill? skills[1].name:"抓"}</td>                        
        </tr>
        <tr>
            <td className="line15">{option===2?<img className="cursor" src={cursor} ></img>:null}</td>
            <td className="line35">{useskill? skills[2].name:"更換怪獸"}</td>
            <td className="line15">{option===3?<img className="cursor" src={cursor} ></img>:null}</td>
            <td className="line35">{useskill? skills[3].name:"逃跑"}</td> 
        </tr>
    </table>
    </div>
    if (sel === -1){
        return <div>
        
                    {tekiview} 
                    <h1>選擇神奇寶貝</h1>
                    <div className="mymonster">
                        {backpack.map((ele,ind) =>
                        {   
                        return <div className="item" style={(ind===selmonster)?selmonsterstyle:{}} ><img className="sel" src={ele.img} ></img><span className="caption" >{ele.name}</span></div> })}
                    </div>
                    <div className="log">{messages}</div>   
                </div>
                    }

    return <div className="main">
        {tekiview}     
        <div className="mikata">
            <img src={backpack[sel].img}/>
            <div className="mikataattr">
            <table>
                <tr>
                    <td className="line25">{backpack[sel].name}</td>
                    <td className="line50"></td> 
                    <td className="line25">{"Lv "+Math.trunc(backpack[sel].cp)}</td>
                </tr>                
                <tr>
                    <td className="line25">{"HP"}</td>
                    <td className="line50" >{mikatahp[sel]>0?<hr className="line" style={mikata}/>:null}</td>
                    <td className="line25">{mikatahp[sel]+"/"+backpack[sel].maxHp}</td>                    
                </tr>
            </table>
            </div>
            {tekihp===0?success:optionpanel}
        </div>
        <p className="log">{messages}</p>
    </div>
   
}



export default AttackView;