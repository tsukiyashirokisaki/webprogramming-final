import React, { useEffect, useState } from 'react';
import MyTextBlock from '../components/myTextBlock'
import TypeTag from './typeTag'
import { useMutation } from '@apollo/client';
import {UpdateHp} from "../FetchData"


function PokDetail(props) {
    const { _id, pokIndex, name, nickname, cp, img, type, skills, evolution, maxHp, hp, attValue, staValue, defValue } = props.pokemon
    const isValidPok = () => {
        return (_id !== undefined)
    }
    const [updateHp] = useMutation(UpdateHp)
    const onclick = ()=>{
        updateHp({variables:{pokId:_id,hp:maxHp}})
        let copymikatahp = props.mikatahp
        copymikatahp[props.currind] = maxHp
        props.setMikatahp(copymikatahp)
    }
    return (
        <>
            {
                <div style={{marginTop: '0%'}}>
                    {
                        (isValidPok()) ?
                            <div style={{ margin: '0px auto'}}>
                                <PokAttr title='寶可夢編號' content={`#${pokIndex}`} />
                                <PokAttr title={name} content="回血" onclick={onclick} backgroundColor="pink" />
                                <img src={img} style={{ borderStyle: 'solid', borderWidth: "1px", maxWidth: '300px', maxHeight: '300px', height: 'auto', width: 'auto' }}></img>
                                <PokAttr title='暱稱' content={nickname} /><br/>
                                <PokAttr title='HP/MAX' content={`${props.mikatahp[props.currind]}/${maxHp}`} />
                                <PokAttr title='CP' content={Math.trunc(cp)} />
                                <PokAttr title='屬性' content={type.map((tp)=><TypeTag type={tp}/>)} />
                                <PokAttr title='ATT' content={Math.trunc(attValue/cp)} />
                                <PokAttr title='DEF' content={Math.trunc(defValue/cp)} />
                                <PokAttr title='STA' content={Math.trunc(staValue/cp)} /><br />
                                <PokAttr title='技能：' content={skills.map((sk)=>(<div style={{textIndent: '1em'}}><TypeTag type={sk.type}/><span>{sk.name}</span></div>))} />
                            </div> :
                            <div>未選擇寶可夢</div>
                    }

                </div>
            }
        </>

    )
}

function PokAttr(props) {
    return (
        <div style={{
            width: props.width ? props.width : '75%',
            marginLeft: props.marginLeft ? props.marginLeft : '22.5%',
            textAlign: 'left'
        }}>
            <MyTextBlock width='100px' innerText={props.title} /><button onClick={props.onclick}
            style={{backgroundColor:props.backgroundColor?props.backgroundColor:"white",border: "none",outline:"none",marginBottom:"1px"}}>{props.content}</button>
        </div>
    )
}

export default PokDetail;