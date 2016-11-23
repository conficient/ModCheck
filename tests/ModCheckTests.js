process.env.NODE_ENV = 'test';

var modcheck = require('../out/ModCheck');
//var modCheck = require("../out/ModCheck");
var expect = require('chai');
var mocha = require('mocha');


describe("Basic function tests", function () {
    it("test valid sortCode, account", function () {
        expect(modCheck.areValid(123456, 12345678)).to.equal(false);
    });
    it("test invalid sortcode, account", function () {
        expect(modCheck.areValid(123456, 12345678)).to.equal(false);
    });
});

/* These tests are generated from the Excel fil /Tools/testCases.xls */
describe("Test cases from v380", function () {
    it('1. Pass modulus 10 check.', function () { expect(modCheck.areValid(89999, 66374958)).to.equal(true); });
    it('2. Pass modulus 11 check.', function () { expect(modCheck.areValid(107999, 88837491)).to.equal(true); });
    it('3. Pass modulus 11 and double alternate checks.', function () { expect(modCheck.areValid(202959, 63748472)).to.equal(true); });
    it('4. Exception 10 & 11 where first check passes and second check fails.', function () { expect(modCheck.areValid(871427, 46238510)).to.equal(true); });
    it('5. Exception 10 & 11 where first check fails and second check passes.', function () { expect(modCheck.areValid(872427, 46238510)).to.equal(true); });
    it('6. Exception 10 where in the account number ab=09 and the g=9. The first check passes and second check fails.', function () { expect(modCheck.areValid(871427, 9123496)).to.equal(true); });
    it('7. Exception 10 where in the account number ab=99 and the g=9. The first check passes and the second check fails.', function () { expect(modCheck.areValid(871427, 99123496)).to.equal(true); });
    it('8. Exception 3, and the sorting code is the start of a range. As c=6 the second check should be ignored.', function () { expect(modCheck.areValid(820000, 73688637)).to.equal(true); });
    it('9. Exception 3, and the sorting code is the end of a range. As c=9 the second check should be ignored.', function () { expect(modCheck.areValid(827999, 73988638)).to.equal(true); });
    it('10. Exception 3. As c<>6 or 9 perform both checks pass.', function () { expect(modCheck.areValid(827101, 28748352)).to.equal(true); });
    it('11. Exception 4 where the remainder is equal to the checkdigit.', function () { expect(modCheck.areValid(134020, 63849203)).to.equal(true); });
    it('12. Exception 1 - ensures that 27 has been added to the accumulated total and passes double alternate modulus check.', function () { expect(modCheck.areValid(118765, 64371389)).to.equal(true); });
    it('13. Exception 6 where the account fails standard check but is a foreign currency account.', function () { expect(modCheck.areValid(200915, 41011166)).to.equal(true); });
    it('14. Exception 5 where the check passes.', function () { expect(modCheck.areValid(938611, 7806039)).to.equal(true); });
    it('15. Exception 5 where the check passes with substitution.', function () { expect(modCheck.areValid(938600, 42368003)).to.equal(true); });
    it('16. Exception 5 where both checks produce a remainder of 0 and pass.', function () { expect(modCheck.areValid(938063, 55065200)).to.equal(true); });
    it('17. Exception 7 where passes but would fail the standard check.', function () { expect(modCheck.areValid(772798, 99345694)).to.equal(true); });
    it('18. Exception 8 where the check passes.', function () { expect(modCheck.areValid(86090, 6774744)).to.equal(true); });
    it('19. Exception 2 & 9 where the first check passes.', function () { expect(modCheck.areValid(309070, 2355688)).to.equal(true); });
    it('20. Exception 2 & 9 where the first check fails and second check passes with substitution.', function () { expect(modCheck.areValid(309070, 12345668)).to.equal(true); });
    it('21. Exception 2 & 9 where a≠0 and g≠9 and passes.', function () { expect(modCheck.areValid(309070, 12345677)).to.equal(false); });
    it('22. Exception 2 & 9 where a≠0 and g=9 and passes.', function () { expect(modCheck.areValid(309070, 99345694)).to.equal(false); });
    it('23. Exception 5 where the first checkdigit is correct and the second incorrect.', function () { expect(modCheck.areValid(938063, 15764273)).to.equal(false); });
    it('24. Exception 5 where the first checkdigit is incorrect and the second correct.', function () { expect(modCheck.areValid(938063, 15764264)).to.equal(false); });
    it('25. Exception 5 where the first checkdigit is incorrect with a remainder of 1.', function () { expect(modCheck.areValid(938063, 15763217)).to.equal(false); });
    it('26. Exception 1 where it fails double alternate check.', function () { expect(modCheck.areValid(118765, 64371388)).to.equal(false); });
    it('27. Pass modulus 11 check and fail double alternate check.', function () { expect(modCheck.areValid(203099, 66831036)).to.equal(false); });
    it('28. Fail modulus 11 check and pass double alternate check.', function () { expect(modCheck.areValid(203099, 58716970)).to.equal(false); });
    it('29. Fail modulus 10 check.', function () { expect(modCheck.areValid(89999, 66374959)).to.equal(false); });
    it('30. Fail modulus 11 check.', function () { expect(modCheck.areValid(107999, 88837493)).to.equal(false); });
    it('31. Exception 12/13 where passes modulus 11 check (in this example, modulus 10 check fails, however, there is no need for it to be performed as the first check passed).', function () { expect(modCheck.areValid(74456, 12345112)).to.equal(true); });
    it('32. Exception 12/13 where passes the modulus 11check (in this example, modulus 10 check passes as well, however, there is no need for it to be performed as the first check passed).', function () { expect(modCheck.areValid(70116, 34012583)).to.equal(true); });
    it('33. Exception 12/13 where fails the modulus 11 check, but passes the modulus 10 check.', function () { expect(modCheck.areValid(74456, 11104102)).to.equal(true); });
    it('34. Exception 14 where the first check fails and the second check passes.', function () { expect(modCheck.areValid(180002, 190)).to.equal(true); });

});
