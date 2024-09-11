"use strict";

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("path-checker", rule, {
  valid: [
    {
      code: "import Article from 'features/Article/Article.tsx'",
      filename:
        "C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\pages\\ArticlePage",
    },
  ],

  invalid: [
    {
      code: "import Article from 'features/Article/Article.tsx'",
      filename:
        "C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article",
      errors: [{ message: "path should be relative" }],
    },
    {
      code: "import Article from '@/features/Article/Article.tsx'",
      options: [
        {
          alias: "@/",
        },
      ],
      filename:
        "C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article",
      errors: [{ message: "path should be relative" }],
    },
  ],
});
