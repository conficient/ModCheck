import data from 'modCheckData';

module modCheck {

    // Check sortCode and accountNumber combination
    // returns true if valid, false if invalid
    export function areValid(sortCode: number | string, accountNumber: number | string) {
        // ensure both values are numbers
        var sc = convertToNumber(sortCode);
        var ac = convertToNumber(accountNumber);

        throw "not implemented";
    }

    function convertToNumber(value: number | string) {
        if (typeof (value) === "number")
            return value;
        return parseInt(value);
    }

}