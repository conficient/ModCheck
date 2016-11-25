
// Check sortCode and accountNumber combination
// returns true if valid, false if invalid
function areValid(sortCode, accountNumber) {
    // ensure both values are numbers
    var sc = convertToInt(sortCode);
    var ac = convertToInt(accountNumber);
    // validity checks
    if(sc <0 || sc>999999) return false;
    if(ac <0 || ac>99999999) return false;

    // check for substitution
    var sort = replaceSort(sc);
    var entries = getEntries(sort);

    // TOOD: modcheck

    throw "not implemented";
}

function convertToInt(value) {
    if (typeof (value) === "number")
        return value;
    return parseInt(value);
}

exports.areValid = areValid;