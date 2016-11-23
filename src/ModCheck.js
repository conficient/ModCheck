
// Check sortCode and accountNumber combination
// returns true if valid, false if invalid
function areValid(sortCode, accountNumber) {
    // ensure both values are numbers
    var sc = convertToInt(sortCode);
    var ac = convertToInt(accountNumber);

    throw "not implemented";
}

function convertToInt() {
    if (typeof (value) === "number")
        return value;
    return parseInt(value);
}
