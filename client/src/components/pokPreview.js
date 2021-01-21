import React, { useEffect, useState } from 'react';

import TypeTag from './typeTag'
function PokPreview(props) {
    
    const {_id, pokIndex, name, nickname, cp, img, type, skills, evolution, maxHp, hp, attValue, staValue, defValue} = props.pokemon

    const isFocusPok = () => {
        return (props.pokemon._id === props.focusPok._id)
    }

    const openDetail = () => {
        console.log(props.pokemon)
        console.log(props.focusPok)
        if (!isFocusPok()) {props.setFocusPok(props.pokemon) ;props.setCurrind(props.ind)}
        else {props.setFocusPok({});props.setCurrind(-1)}
    }
    return (
        <>
        <li style={{borderStyle: 'solid', borderWidth: '2px', textAlign: 'center', backgroundColor: (isFocusPok()) ? 'lightblue' : 'transparent'}} onClick={openDetail}>
            <div>{nickname}</div>
            <img src={img} style={{borderStyle: 'solid', borderWidth: "1px", maxWidth: '180px', maxHeight: '180px', height: 'auto', width: 'auto'}}></img>
            <div>Type: {type.map((tp)=><TypeTag type={tp} />)}</div>
            <div>HP: {props.mikatahp[props.ind]}/{maxHp} CP: {Math.trunc(cp)}</div>

        </li>
        </>
        
    )
}

export default PokPreview;