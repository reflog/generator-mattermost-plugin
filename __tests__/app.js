"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-mattermost-plugin:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "t",
      server: true,
      webapp: false,
      settings: false,
      id: "a.b.c",
      description: "test"
    });
  });

  it("creates files", () => {
    assert.file(["t/go.mod"]);
    assert.noFile(["t/webapp/package.json"]);
  });
});
