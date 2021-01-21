import './backpackView.css'

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import PokPreview from "../components/pokPreview"
import PokDetail from "../components/pokDetail"

function BackpackView(props) {
    var backpack = []
    var idstring

    var splitRatio = '75%'
    const [focusPok, setFocusPok] = useState({});

    for (var i = 0; i < props.backpack.length; i++) {
        idstring = props.backpack[i].pokIndex + ""
        while (idstring.length < 3) {
            idstring = "0" + idstring
        }
        backpack.push({ ...props.backpack[i], img: require("./images/" + idstring + ".png").default })
    }
    // console.log(backpack)



    return (
        <>
            <div style={{marginLeft: '20px', marginTop: '20px'}}><Link to="/map"><button>return</button></Link></div>
            <div>
                <div className="pokemon-list" style={{ height: '100%', width: splitRatio, overflow: 'hidden', position: 'fixed' }}>
                    <nav>
                        <ul className="horizontal-list">
                            {backpack.map((pok) =>
                                <>
                                    <PokPreview pokemon={pok} focusPok={focusPok} setFocusPok={setFocusPok} />
                                </>
                            )}
                        </ul>

                    </nav>
                </div>
                <div style={{ marginLeft: splitRatio, textAlign: 'center'}}>
                    <PokDetail pokemon={focusPok} />
                </div>
            </div>
        </>
    )
}



export default BackpackView;