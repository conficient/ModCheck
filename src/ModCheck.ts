
//
// ModCheck library
//
module ModCheck {

    export function AreValid(sortCode:any, accountNumber:any) {
        throw "not implemented";
    }

    function getNumericValue(value:any) {
        if (typeof value == "number")
            return <number>value;

    }
}