import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
function PokPreview(props) {
    
    const {pokIndex, name, nickname, cp, img, type, skills, evolution, maxHp, hp, attValue, staValue, defValue} = props.pokemon

    const openDetail = () => {
        
    }
    return (
        <>
        <li style={{borderStyle: 'solid', borderWidth: '2px', textAlign: 'center'}} onClick={openDetail}>
            <div>#{pokIndex}: {nickname}</div>
            <img src={img} style={{borderStyle: 'solid', borderWidth: "1px", height: '80%', width: '80%'}}></img>
            <div>Type: {type.map((tp=><span><span style={{borderWidth: "1px", borderStyle: 'solid'}}>{tp}</span> </span>))}</div>
            <div>HP: {hp}/{maxHp} CP: {cp}</div>
            <div>ATT: {Math.trunc(attValue/cp)}</div>
            <div>DEF: {Math.trunc(defValue/cp)}</div>
            <div>STA: {Math.trunc(staValue/cp)}</div>
        </li>
        </>
        
    )
}

export default PokPreview;