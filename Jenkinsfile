pipeline {
    agent any
    tools {
        nodejs "nodejs14"
    }
    options{
        timeout(time:10, unit: 'MINUTES')
    }
    stages {
       stage('install') {
          steps {
            echo '下载依赖...'
            sh 'node -v'
            sh 'npm -v'
            sh """
              npm i --registry=http://registry.npm.taobao.org
            """
          }
       }
       stage('Build') {
            when { branch 'master' }
            steps {
              input "需要部署到QA环境吗?"
              sh 'NODE_ENV=qa npm run build:weapp'
            }
       }
       stage('Deploy') {
            when { branch 'master' }
            steps {
              sh 'npm run deployA'
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
