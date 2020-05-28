pipeline {
    agent any
    options{
        retry(3)
        timeout(time:10, unit: 'MINUTES')
    }
    stages {
       stage('install') {
          steps {
            echo '下载依赖...'
            sh 'yarn'
          }
       }
       stage('build') {
          steps {
            sh "yarn build:weapp"
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
