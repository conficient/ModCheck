/// <reference path="../typings/tsd.d.ts" />
// /// <reference path="../dist/typings/ModCheck.d.ts" />

var modCheck = require("../src/ModCheck");

// var modCheck: (number,number):boolean;


describe("Basic function", function() {
    it("ensure modCheck is working", function() {

        expect(modCheck.AreValid(123456, 12345678)).toBe(false);
    });
});

describe("Test cases from v380", function() {
    it('1. Pass modulus 10 check.', function() { expect(modCheck.AreValid(89999, 66374958)).toBe(true); });
    it('2. Pass modulus 11 check.', function() { expect(modCheck.AreValid(107999, 88837491)).toBe(true); });
    it('3. Pass modulus 11 and double alternate checks.', function() { expect(modCheck.AreValid(202959, 63748472)).toBe(true); });
    it('4. Exception 10 & 11 where first check passes and second check fails.', function() { expect(modCheck.AreValid(871427, 46238510)).toBe(true); });
    it('5. Exception 10 & 11 where first check fails and second check passes.', function() { expect(modCheck.AreValid(872427, 46238510)).toBe(true); });
    it('6. Exception 10 where in the account number ab=09 and the g=9. The first check passes and second check fails.', function() { expect(modCheck.AreValid(871427, 9123496)).toBe(true); });
    it('7. Exception 10 where in the account number ab=99 and the g=9. The first check passes and the second check fails.', function() { expect(modCheck.AreValid(871427, 99123496)).toBe(true); });
    it('8. Exception 3, and the sorting code is the start of a range. As c=6 the second check should be ignored.', function() { expect(modCheck.AreValid(820000, 73688637)).toBe(true); });
    it('9. Exception 3, and the sorting code is the end of a range. As c=9 the second check should be ignored.', function() { expect(modCheck.AreValid(827999, 73988638)).toBe(true); });
    it('10. Exception 3. As c<>6 or 9 perform both checks pass.', function() { expect(modCheck.AreValid(827101, 28748352)).toBe(true); });
    it('11. Exception 4 where the remainder is equal to the checkdigit.', function() { expect(modCheck.AreValid(134020, 63849203)).toBe(true); });
    it('12. Exception 1 - ensures that 27 has been added to the accumulated total and passes double alternate modulus check.', function() { expect(modCheck.AreValid(118765, 64371389)).toBe(true); });
    it('13. Exception 6 where the account fails standard check but is a foreign currency account.', function() { expect(modCheck.AreValid(200915, 41011166)).toBe(true); });
    it('14. Exception 5 where the check passes.', function() { expect(modCheck.AreValid(938611, 7806039)).toBe(true); });
    it('15. Exception 5 where the check passes with substitution.', function() { expect(modCheck.AreValid(938600, 42368003)).toBe(true); });
    it('16. Exception 5 where both checks produce a remainder of 0 and pass.', function() { expect(modCheck.AreValid(938063, 55065200)).toBe(true); });
    it('17. Exception 7 where passes but would fail the standard check.', function() { expect(modCheck.AreValid(772798, 99345694)).toBe(true); });
    it('18. Exception 8 where the check passes.', function() { expect(modCheck.AreValid(86090, 6774744)).toBe(true); });
    it('19. Exception 2 & 9 where the first check passes.', function() { expect(modCheck.AreValid(309070, 2355688)).toBe(true); });
    it('20. Exception 2 & 9 where the first check fails and second check passes with substitution.', function() { expect(modCheck.AreValid(309070, 12345668)).toBe(true); });
    it('21. Exception 2 & 9 where a≠0 and g≠9 and passes.', function() { expect(modCheck.AreValid(309070, 12345677)).toBe(false); });
    it('22. Exception 2 & 9 where a≠0 and g=9 and passes.', function() { expect(modCheck.AreValid(309070, 99345694)).toBe(false); });
    it('23. Exception 5 where the first checkdigit is correct and the second incorrect.', function() { expect(modCheck.AreValid(938063, 15764273)).toBe(false); });
    it('24. Exception 5 where the first checkdigit is incorrect and the second correct.', function() { expect(modCheck.AreValid(938063, 15764264)).toBe(false); });
    it('25. Exception 5 where the first checkdigit is incorrect with a remainder of 1.', function() { expect(modCheck.AreValid(938063, 15763217)).toBe(false); });
    it('26. Exception 1 where it fails double alternate check.', function() { expect(modCheck.AreValid(118765, 64371388)).toBe(false); });
    it('27. Pass modulus 11 check and fail double alternate check.', function() { expect(modCheck.AreValid(203099, 66831036)).toBe(false); });
    it('28. Fail modulus 11 check and pass double alternate check.', function() { expect(modCheck.AreValid(203099, 58716970)).toBe(false); });
    it('29. Fail modulus 10 check.', function() { expect(modCheck.AreValid(89999, 66374959)).toBe(false); });
    it('30. Fail modulus 11 check.', function() { expect(modCheck.AreValid(107999, 88837493)).toBe(false); });
    it('31. Exception 12/13 where passes modulus 11 check (in this example, modulus 10 check fails, however, there is no need for it to be performed as the first check passed).', function() { expect(modCheck.AreValid(74456, 12345112)).toBe(true); });
    it('32. Exception 12/13 where passes the modulus 11check (in this example, modulus 10 check passes as well, however, there is no need for it to be performed as the first check passed).', function() { expect(modCheck.AreValid(70116, 34012583)).toBe(true); });
    it('33. Exception 12/13 where fails the modulus 11 check, but passes the modulus 10 check.', function() { expect(modCheck.AreValid(74456, 11104102)).toBe(true); });
    it('34. Exception 14 where the first check fails and the second check passes.', function() { expect(modCheck.AreValid(180002, 190)).toBe(true); });

});
