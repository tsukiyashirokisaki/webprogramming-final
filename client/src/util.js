function isSameCoord(coord1, coord2) {
    console.assert("row" in coord1);
    console.assert("row" in coord2);
    console.assert("col" in coord1);
    console.assert("col" in coord2);
    return (coord1.row === coord2.row && coord1.col === coord2.col)
        
}


export {isSameCoord};