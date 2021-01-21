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
        if (!isFocusPok()) props.setFocusPok(props.pokemon)
        else props.setFocusPok({})
    }
    return (
        <>
        <li style={{borderStyle: 'solid', borderWidth: '2px', textAlign: 'center', backgroundColor: (isFocusPok()) ? 'lightblue' : 'transparent'}} onClick={openDetail}>
            <div>{nickname}</div>
            <img src={img} style={{borderStyle: 'solid', borderWidth: "1px", maxWidth: '180px', maxHeight: '180px', height: 'auto', width: 'auto'}}></img>
            <div>Type: {type.map((tp)=><TypeTag type={tp} />)}</div>
            <div>HP: {hp}/{maxHp} CP: {Math.trunc(cp)}</div>

        </li>
        </>
        
    )
}

export default PokPreview;