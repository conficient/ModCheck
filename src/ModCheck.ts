// Check sortCode and accountNumber combination
// returns true if valid, false if invalid
function areValid(sortCode: number | string, accountNumber: number | string) {
    // ensure both values are numbers
    var sc = convertToInt(sortCode);
    var ac = convertToInt(accountNumber);

    throw "not implemented";
}

function convertToInt(value: number|string){
    if(typeof(value)==="number")
        return value;
    return parseInt(value);
}
