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
            sh 'node -v'
            sh 'npm -v'
            sh """
              npm i
            """
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
