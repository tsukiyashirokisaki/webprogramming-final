import React, { useEffect, useState } from 'react';
function TypeTag(props) {
    
    let bgColor, txtColor
    if (props.type==='火') {bgColor = '#ff3700'; txtColor = 'white'}
    if (props.type==='水') {bgColor = '#0094e5'; txtColor = 'white'}
    if (props.type==='電') {bgColor = '#e4b700'; txtColor = 'white'}
    if (props.type==='草') {bgColor = '#92bf19'; txtColor = 'white'}
    if (props.type==='冰') {bgColor = '#00b7ee'; txtColor = 'white'}
    if (props.type==='格鬥') {bgColor = '#c85500'; txtColor = 'white' }
    if (props.type==='毒') { bgColor = '#be78be'; txtColor = 'white' }
    if (props.type==='地面') { bgColor = '#cca142'; txtColor = 'white' }
    if (props.type==='飛行') { bgColor = '#79bcd7'; txtColor = 'white' }
    if (props.type==='超能力') { bgColor = '#dc78c8'; txtColor = 'white' }
    if (props.type==='蟲') { bgColor = '#32B432'; txtColor = 'white' }
    if (props.type==='岩石') { bgColor = '#a07850'; txtColor = 'white' }
    if (props.type==='幽靈') { bgColor = '#8c78f0'; txtColor = 'white' }
    if (props.type==='龍') { bgColor = '#3c64c8'; txtColor = 'white' }
    if (props.type==='惡') { bgColor = '#646464'; txtColor = 'white' }
    if (props.type==='鋼') { bgColor = '#96b4dc'; txtColor = 'white' }
    if (props.type==='妖精') { bgColor = '#ff7eb8'; txtColor = 'white' }
    
    return (
        <span style={{borderWidth: "1px", borderStyle: 'solid', color: txtColor, backgroundColor: bgColor}}>{props.type}</span>
    )
}

export default TypeTag;