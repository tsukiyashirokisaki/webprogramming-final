import React, { useEffect, useState } from 'react';
function MyTextBlock(props) {
    return (
        <>
            <span style={{width: props.width, display: "inline-block"}}>{props.innerText}</span>
        </>
        
    )
}

export default MyTextBlock;