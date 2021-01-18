import "./AttackView.css"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom';
import image from './002.png'
function AttackView(props) {
    const [sel,setSel] = useState(0)
    const monster =["A","B","C"]
    const [tekihp, setTekihp] = useState(100)
    const teki = {
        width: tekihp+"px"
    }
    const [mikatahp, setMikatahp] = useState(100)
    const mikata = {
        width: mikatahp+"px"
    }
    if (!sel){
        return <div>{monster.map(ele =><ol><button>{ele}</button></ol>)}</div>
    }
    
    
    
    return <div class="main">
        <div class="teki">
            <img src={image}/>
            {/* <span class="caption">妙蛙草</span> */}
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
            <img src={image}/>
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