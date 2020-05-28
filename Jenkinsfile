pipeline {
    agent {
        docker {
            image 'node'
            args '-p 3000:3000'
        }
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
       stage('build') {
          steps {
            sh "npm run build:weapp"
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
