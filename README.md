
# ModCheck

ModCheck is a modulus check library for validating UK Bank account number and sort code combinations.

The specification, data and test cases are available at [Vocalink](https://www.vocalink.com/customer-support/modulus-checking/).


[![Build Status](https://travis-ci.org/conficient/ModCheck.png)](https://travis-ci.org/conficient/ModCheck)


## Installation
Get the `ModCheck` package [from NuGet](http://www.nuget.org/packages/ModCheck).

    Install-Package ModCheck

## Usage

ModCheck has a single method `AreValid(sortCode, accountNumber)`

 * **sortCode:**    number or string containing bank sort code, e.g. 102030 - should be six digits

 *  **accountNumber:**   account number in string or numeric form

If the sortCode or accountNumber are invalid (e.g. sort should be six digits, 
and account eight digits) the method returns false.

It then runs the Modulus Check algorithm and returns true if both pass.

This only indicates that the sort+account combination is a valid modulus check,
it does not tell you if the account exists or not.

