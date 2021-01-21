import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginInputBox from '../components/loginInputBox';

import { useQuery } from '@apollo/client'
import { LogIn } from "../FetchData"

function BackpackView(props) {


    return (
        <>
            <div><Link to="/map">return</Link></div>
            <div>Backpack not implement yet!!</div>
        </>
    )
}



export default BackpackView;