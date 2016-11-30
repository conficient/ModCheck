
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
    if (entries.length > 2) throw "unexpected number of validation entries";
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
    var e0 = entries[0];
    var e1 = entries[1];
    // create validator for each entry 
    var v1 = getValidator(sort, account, e0);
    var v2 = getValidator(sort, account, e1);
    var hasSecond = !(!v2);
    var result1 = v1.isValid(sort, account, e0);

    // if no other check, this is fine
    if (!hasSecond) return result1;

    // some cases validate on first instance only
    var both = v1.bothChecksRequired();
    if (result1 && !both) return result1;

    var result2 = v2.isValid(sort, account, e1);
    if (both)
        return result1 && result2;
    else
        return result2;
}

function getValidator(sort, account, entry) {
    // if no entry, no validator
    if (!entry) null;
    switch (entry.ex) {
        case 1:
            return Ex1();
        case 2:
            return Ex2();
        case 3:
            return Ex3();
        case 4:
            return Ex4();
        case 5:
            return Ex5();
        case 6:
            return Ex6();
        case 7:
            return Ex7();
        case 8:
            return Ex8();
        case 9:
            return Ex9();
        case 10:
            return Ex10();
        case 11:
            return Ex11();
        case 12:
            return Ex12();
        case 13:
            return Ex13();
        case 14:
            return Ex14();
        default:
            return Ex0();
    }
}

// base case
function Ex0() {
    return new baseValidator();
}

function SingleCheck() {
    var r = new baseValidator();
    r.bothChecksRequired = false;
    return r;
}

function Ex1() {
    var r = new baseValidator();
    r.startingTotal = 27;
    return r;
}

function Ex2() {
    var r = SingleCheck();
    // override this method
    r.getWeights = function (sort, account, entry) {
        var a = r.getColValue(ac, 0);
        if (a != 0) {
            var g = r.getColValue(ac, 6);
            if (g == 9)
                return [0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 10, 9, 3, 1];
            else
                return [0, 0, 1, 2, 5, 3, 6, 4, 8, 7, 10, 9, 3, 1];
        }
        // use normal weights
        return entry.w;
    }
    return r;
}

function Ex3() {
    var r = new baseValidator();
    r.isCheckRequired = function(ac) {
        var c = r.getColValue(ac, 2);
        return !(c == 6 || c==9);
    }
    return false;
}

function Ex4() {
     var r = new baseValidator();
    r.getExpectedRemainder = function(ac, method) {
        var g = this.GetColValue(ac, 6);
        var h = this.GetColValue(ac, 7);
        return (g * 10) + h;
    }
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

//
// closure to hold base implementation
// methods and values can be overridded for exceptions
//
var baseValidator = (function () {
    function baseValidator() {
        this.startingTotal = 0;
    }

    // check validity for sort/account/entry values
    baseValidator.prototype.isValid = function (sort, account, entry) {
        // TODO: compute
        var ac = this.getDigits(this.Account);
        var required = this.isCheckRequired(ac);
        if (!required)
            return true;

        // get values 
        var values = this.getValues(sort, account);
        var expectedRemainder = this.getExpectedRemainder(account, entry.m);
        // validate
        var result = this.isEntryValid(values, entry, expectedRemainder);

        // if failed see if second check is mandated (exception 14)
        if (result == false && this.secondCheckWithAmendedAccount(ac)) {
            // run second check
            var altValues = this.getValuesForSecondCheck(sort, account);
            result = this.isEntryValid(altValues, entry, expectedRemainder)
        }

        return result;
    }

    baseValidator.prototype.isEntryValid = function (values, entry, expectedRemainder) {
        // set values
        var weights = entry.w; // int[]
        var method = entry.m; // MOD10/MOD11/DBLAL etc
        var remainder = this.computeRemainder(values, weights, start, method);
        var valid = (remainder = expectedRemainder);

        return valid;
    }

    baseValidator.prototype.computeRemainder = function (values, weights, start, method) {
        // set values
        var divisor = (method == "MOD11") ? 11 : 10;
        var total = start;
        for (var i = 0; i < 14; i++) {
            var t = weights[i] * values[i];
            var add = (method == "DBLAL") ? this.getDigitTotals(t) : t;
            total += add;
        }

        var remainder = total % divisor;

        return remainder;
    }

    // get sum of the digits
    baseValidator.prototype.getDigitTotals = function (t) {
        if (t < 10)
            return t;
        var s = t.toString();
        var r = 0;
        for (var i = 0; i < s.length; i++) {
            r += parseInt(s.substr(i, 1));
        }
        return r;
    }

    baseValidator.prototype.getDigits = function (ac) {
        return this.pad(ac, 8);
    }

    baseValidator.prototype.getValueArray = function (sc, ac) {
        var t = this.pad(sc, 6) + this.pad(ac, 8);
        var r = [];
        for (var i = 0; i < 14; i++) {
            var j = parseInt(t.substr(i, 1));
            r.push(j);
        }
        return r;
    }

    baseValidator.prototype.getColValue = function (ac, i) {
        var c = ac.substr(i, 1);
        return parseInt(c);
    }

    // pad number v with leading zeros to length d
    baseValidator.prototype.pad = function (v, d) {
        var s = v + "";
        while (s.length < d) {
            s = "0" + s;
        }
        return s;
    }

    // OVERRIDABLE METHODS BELOW

    baseValidator.prototype.getWeights = function (entry, account) {
        return entry.w;
    }

    baseValidator.prototype.bothChecksRequired = function () {
        return true;
    }

    baseValidator.prototype.getValues = function (sort, account) {
        return this.getValues(sort, account);
    }

    baseValidator.prototype.getValuesForSecondCheck = function (sort, account) {
        throw "getValuesForSecondCheck should not be called for this Exception";
    }

    baseValidator.prototype.isCheckRequired = function (ac) { // ac is string digits
        return true;
    }

    baseValidator.prototype.secondCheckWithAmendedAccount = function (ac) {
        return false;
    }

    return baseValidator;
} ());