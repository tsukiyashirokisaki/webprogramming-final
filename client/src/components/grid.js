import "./grid.css"
import React from 'react';

import {isSameCoord} from '../util'


function Grid(props) {
    let grid = []
    for (var i = 0; i < props.mapSize.row; ++i) {
        grid.push(<GridRow mapSize={props.mapSize} rowId={i} currCoord={props.coord} edgeLength={props.edgeLength} />)
    }
    return (
        <table className="mapgrid"><tbody>
            {grid}
        </tbody></table>
    )
}

function GridRow(props) {
    let row = []
    for (var i = 0; i < props.mapSize.col; ++i) {
        row.push(<GridElement coord={{row: props.rowId, col: i}} currCoord={props.currCoord} edgeLength={props.edgeLength}/>)
    }
    return (
        <>
            <tr>
                {row}
            </tr>
        </>
    )
}

function GridElement(props) {
    
    return (
        <>
            <td className="mapgrid-element">
                <div className={isSameCoord(props.coord, props.currCoord) ? "checkbutt" : "butt"} 
                     style={{width: `${props.edgeLength}px`,
                             height: `${props.edgeLength}px`
                }}/>
            </td>
        </>
    )
}

export default Grid;