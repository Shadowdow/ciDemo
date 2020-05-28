#!/usr/bin/env node

const child_process = require("child_process");
// const fs = require("fs");
const path = require("path");

const package = require("../package.json");

const NEED_LOGIN_IN_ERROR_CODE = "40000";
// const ENV = process.env.ENV;
const VERSION = package.version;
const projectPath = path.resolve(path.dirname(""), "dist");

const weixinCli =
  process.env.WEIXIN_CLI ||
  "/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli";
const loginCommand = `${weixinCli} -l`;
const deployCommand = `${weixinCli} -u ${VERSION}@${projectPath}`;
const gitCommand = "git log --pretty='%s%b' -n 1";

function login(commitMsg) {
  const loginChild = child_process.exec(loginCommand, function(err) {
    if (err) {
      console.error(`login failed\n${err}`);
      return;
    }
    // const message = `${ENV? `ENV: ${ENV}` : ''} ${commitMsg}`
    // deploy(message);
    console.log(commitMsg)
  });

  loginChild.stdout.on("data", function(data) {
    console.log(data);
  });
}

function getLatestCommitMsg(cb) {
  const gitChild = child_process.exec(gitCommand, function(err, msg) {
    if (err) {
      console.error(`get git message failed\n${err}`);
      return;
    }
  });

  gitChild.stdout.on("data", function(data) {
    cb(data);
  });
}

function deploy(commitMsg) {
  const deployChild = child_process.exec(
    `${deployCommand} --upload-desc '${commitMsg}'`,
    function(err) {
      if (err && err.message.includes(NEED_LOGIN_IN_ERROR_CODE)) {
        console.warn(`need login in: ${err.message}`);
        login(commitMsg);
        return;
      }
      if (err) {
        console.error(`deploy failed\n${err}`);
      }
    }
  );

  deployChild.stdout.on("data", function(data) {
    console.log(data);
  });
}

getLatestCommitMsg(function(commitMsg) {
  login(commitMsg);
});
