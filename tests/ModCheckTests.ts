/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../dist/typings/ModCheck.d.ts" />

import modCheck = require("../artifacts/dev/ModCheck");

describe("Basic function", function () {
    it("ensure modCheck is working", function () {

        expect(modCheck.AreValid(123456, 12345678)).toBe(false);
    });
});

