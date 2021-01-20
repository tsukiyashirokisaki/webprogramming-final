import './backpackView.css'

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import PokPreview from "../components/pokPreview"

function BackpackView(props) {
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

    

    return (
        <>
            <div><Link to="/map">return</Link></div>
            <div className="pokemon-list" style={{height: '100%', overflow: 'hidden'}}>
                <nav>
                <ul className="horizontal-list">
                    {backpack.map((pok) => 
                    <>
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    <PokPreview pokemon={pok} />
                    </>
                    )}
                </ul>

                </nav>
            </div>
        </>
    )
}



export default BackpackView;