# ModCheck
Typescript + Javascript library for UK BACS bank account validation

The specification, data and test cases are provided by [Vocalink](https://www.vocalink.com/customer-support/modulus-checking/).
 
[![Build Status](https://travis-ci.org/conficient/ModCheck.png)](https://travis-ci.org/conficient/ModCheck)


## Installation
Get the `ModCheck` package [from NuGet](http://www.nuget.org/packages/ModCheck).

    Install-Package ModCheck

## Usage

ModCheck has a single method AreValid(sortCode, accountNumber)

 * `sortCode`    number or string containing bank sort code, e.g. 102030 - should be six digits

 *  `accountNumber`   account number in string or numeric form

