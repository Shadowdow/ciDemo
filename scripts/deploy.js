#!/usr/bin/env node

const child_process = require('child_process');
// const fs = require("fs");
const path = require('path');

const package = require('../package.json');

const NEED_LOGIN_IN_ERROR_CODE = '40000';
// const ENV = process.env.ENV;
const VERSION = package.version;
const projectPath = path.resolve(path.dirname(''), 'dist');

const weixinCli =
  process.env.WEIXIN_CLI ||
  '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
const loginCommand = `miniprogram-ci upload --pp ${projectPath} --pkp ${path.resolve(path.dirname(''), 'scripts/private.key')} --appid wx3104fa42162177c0 --uv 1.0.1 -r 1 --enable-es6 true --qrcode-format image --qrcode-output-dest ${path.resolve(path.dirname(''), 'qrcode/destination1.jpg')}`;
const deployCommand = `miniprogram-ci upload --pp ${projectPath} --pkp ${path.resolve(path.dirname(''), 'scripts/private.key')} --appid wx3104fa42162177c0 --uv 1.0.0 -r 1 --enable-es6 true`;
const gitCommand = 'git log --pretty=\'%s\' -1';

function login(commitMsg) {
  const loginChild = child_process.exec(loginCommand, function (err) {
    if (err) {
      console.error(`login failed\n${err}`);
      return;
    }
    // const message = `${ENV? `ENV: ${ENV}` : ''} ${commitMsg}`
    // deploy(message);
    console.log(commitMsg);
  });

  loginChild.stdout.on('data', function (data) {
    console.log('预览data', data);
  });
}

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

function deploy(commitMsg) {
  const deployChild = child_process.exec(deployCommand,
    function (err) {
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

  console.log('commitMsg', commitMsg);

  deployChild.stdout.on('data', function (data) {
    console.log(data);
  });
}

getLatestCommitMsg(function (commitMsg) {
  deploy(commitMsg);
});

// const ci = require('miniprogram-ci');
// (async () => {
//   const project = new ci.Project({
//     appid: 'wx3104fa42162177c0',
//     type: 'miniProgram',
//     projectPath: projectPath,
//     privateKeyPath: path.resolve(path.dirname(''), 'scripts/private.key'),
//     ignores: ['node_modules/**/*'],
//   });
//   ci.preview({
//     project,
//     desc: 'hello',
//     setting: {
//       es6: true,
//     },
//     qrcodeFormat: 'image',
//     qrcodeOutputDest: path.resolve(path.dirname(''), 'qrcode/destination.jpg'),
//     onProgressUpdate: console.log,
//     pagePath: 'pages/index/index', // 预览页面
//     // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
//   }).then((res) => {
//     console.log('res', res);
//   }, (err) => {
//     console.log('err', err);
//   });
// })();

