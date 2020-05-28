pipeline {
    agent any
    tools {
        nodejs "nodejs12"
    }
    options{
        timeout(time:10, unit: 'MINUTES')
    }
    stages {
       stage('install') {
          steps {
            echo '下载依赖...'
            sh """
              npm install -g @tarojs/cli
              npm i
            """
          }
       }
       stage('Build') {
         when { branch 'master' }
         steps {
           input "需要部署到QA环境吗?"
           sh 'npm run build:weapp'
         }
       }
       stage('Deploy') {
         when { branch 'master' }
         steps {
           sh 'npm run deploy'
         }
       }
    }
   post {
       success {
            echo '构建成功'
          }
       failure {
            echo '构建失败'
          }
    }
}
