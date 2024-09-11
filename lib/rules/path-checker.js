"use strict";

const path = require("path");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string",
            default: false,
          },
        },
        additionalProperties: false, // Ensures no other properties are allowed
      },
    ], // Add a schema if the rule has options
    messages: {}, // Add messageId and message
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const options = context.options[0] || {};
        const alias = options.alias;

        const filename = node.source.value;
        const importTo = alias ? filename.replace(alias, "") : filename;
        const fromFilename = context.filename;

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report({ node: node, message: "path should be relative" });
        }
      },
    };
  },
};

function isRelativePath(path) {
  return path === "." || path.startsWith("./") || path.startsWith("../");
}

const layers = {
  pages: "pages",
  features: "features",
  entities: "entities",
  widgets: "widgets",
};

function shouldBeRelative(from, to) {
  if (isRelativePath(to)) {
    return false;
  }

  const [toLayer, toSlice] = to.split("/");

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split("src")[1];
  const fromArray = projectFrom?.split(/\\|\//) ?? [];

  const [, fromLayer, fromSlice] = fromArray;

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return toLayer === fromLayer && toSlice === fromSlice;
}
