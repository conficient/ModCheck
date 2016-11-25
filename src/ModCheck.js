
// Check sortCode and accountNumber combination
// returns true if valid, false if invalid
function areValid(sortCode, accountNumber) {
    // ensure both values are numbers
    var sc = convertToInt(sortCode);
    var ac = convertToInt(accountNumber);
    // validity checks
    if (sc < 0 || sc > 999999) return false;
    if (ac < 0 || ac > 99999999) return false;

    // check for substitution
    var sort = replaceSort(sc);
    var entries = getEntries(sort);

    // if too many, fail
    if(entries.length > 2) throw "unexpected number of validation entries";
    // if there are no matching validators, we assume the sc+ac is valid
    if (!entries || entries.length == 0) return true;

    // do modulus checks
    return validate(sort, ac, entries);
}

function convertToInt(value) {
    if (typeof (value) === "number")
        return value;
    return parseInt(value);
}

exports.areValid = areValid;

function validate(sort, account, entries) {
    // create validator for each entry - s
    var v1 = getValidator(sort, account, entries[0]);
    var v2 = getValidator(sort, account, entries[1]);
}

function getValidator(sort,account,entry) {
    // if no entry, no validator
    if(!entry) null;
    switch(entry.ex) {
        case 1:
            return Ex1; 
    }
}

// base case
function Ex0() {
    return false;
}

function Ex1() {
    return false;
}

function Ex2() {
    return false;
}

function Ex3() {
    return false;
}

function Ex4() {
    return false;
}

function Ex5() {
    return false;
}

function Ex6() {
    return false;
}

function Ex7() {
    return false;
}

function Ex8() {
    return false;
}

function Ex9() {
    return false;
}

function Ex10() {
    return false;
}

function Ex11() {
    return false;
}

function Ex12() {
    return false;
}

function Ex14() {
    return false;
}
