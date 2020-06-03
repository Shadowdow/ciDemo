#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');
const package = require('../package.json');
const VERSION = package.version;
const projectPath = path.resolve(path.dirname(''), 'dist');
const privateKeyPath = path.resolve(path.dirname(''), 'scripts/private.key');
const gitCommand = 'git log --pretty=\'%s\' -1';

function getLatestCommitMsg(cb) {
  const gitChild = child_process.exec(gitCommand, function (err, msg) {
    if (err) {
      console.error(`get git message failed\n${err}`);
      return;
    }
  });

  gitChild.stdout.on('data', function (data) {
    cb(data);
  });
}

getLatestCommitMsg(function (commitMsg) {
  const ci = require('miniprogram-ci');
  (
    async () => {
      const project = new ci.Project({
        appid: 'wx3104fa42162177c0',
        type: 'miniProgram',
        projectPath: projectPath,
        privateKeyPath: privateKeyPath,
        ignores: ['node_modules/**/*'],
      });
      const defaults = {
        project,
        desc: commitMsg,
        setting: { es6: false, urlCheck: true, postcss: false, minified: false },
        onProgressUpdate: console.log,
      };
      const uploadConfig = Object.assign({}, defaults, { version: VERSION, robot: 1, });
      await ci.upload(uploadConfig);
    })();
});
