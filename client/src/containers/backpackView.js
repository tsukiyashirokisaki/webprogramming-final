import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginInputBox from '../components/loginInputBox';

import { useQuery } from '@apollo/client'
import { LogIn } from "../FetchData"

function BackpackView(props) {
    // var backpack = []
    // var idstring

    // for (var i=0;i<props.backpack.length;i++){
    //     idstring = props.backpack[i].pokIndex+""
    //     while (idstring.length<3){
    //         idstring = "0"+idstring
    //     }
    //     backpack.push({...props.backpack[i],img: require("./images/"+idstring+".png").default})
    // }
    // console.log(backpack)

    return (
        <>
            <div><Link to="/map">return</Link></div>
            <div>Backpack not implement yet!!</div>
        </>
    )
}



export default BackpackView;