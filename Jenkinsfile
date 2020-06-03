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
              npm i
              npm rebuild node-sass
            """
          }
       }
       stage('Build') {
            when { branch 'master' }
            steps {
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
