"use strict";

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("path-checker", rule, {
  valid: ["value"],

  invalid: [
    {
      code: "This should be relative path",
      errors: [{ messageId: "Fill me in.", type: "Me too" }],
    },
  ],
});
