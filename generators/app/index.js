"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to ${chalk.red("mattermost-plugin")} generator!`));

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Plugin name",
        validate: str => str.length > 0,
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "repo",
        message: "Github repo location for this plugin (doesn't have to exist)",
        validate: str => str.length > 0,
        default: `yourusername/${this.appname}`
      },

      {
        type: "input",
        name: "description",
        message: "Plugin description"
      },
      {
        type: "input",
        name: "id",
        message: "Plugin id",
        default: `com.example.${this.appname}`
      },
      {
        type: "confirm",
        name: "webapp",
        message: "Would you like to enable Webapp plugin part?",
        default: true
      },
      {
        type: "confirm",
        name: "server",
        message: "Would you like to enable Server plugin part?",
        default: true
      },
      {
        type: "confirm",
        name: "settings",
        message: "Would you like to generate example settings usage?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const tp = n => this.templatePath(n);
    const dp = n => this.destinationPath(n);
    mkdirp(this.props.name);
    const prefix = this.props.name + "/";
    const commonFiles = [
      ".editorconfig",
      ".gitignore",
      "LICENSE",
      "Makefile",
      "plugin.json",
      "CHANGELOG.md",
      "README.md"
    ];
    this.fs.copy(tp(".circleci"), dp(`${prefix}.circleci`));
    this.fs.copy(tp("assets"), dp(`${prefix}assets`));
    this.fs.copy(tp("build"), dp(`${prefix}build`));
    if (this.props.webapp) {
      this.fs.copy(tp("public"), dp(`${prefix}public`));
      this.fs.copy(tp("webapp"), dp(`${prefix}webapp`));
    }

    if (this.props.server) {
      this.fs.copy(tp("server"), dp(`${prefix}server`));
      this.fs.copy(tp("go.sum"), dp(`${prefix}go.sum`));
      this.fs.copyTpl(tp("go.mod"), dp(`${prefix}go.mod`), this.props);
    }

    commonFiles.forEach(f =>
      this.fs.copyTpl(tp(f), dp(`${prefix}${f}`), this.props)
    );
  }

  install() {
    // This.installDependencies();
  }
};
