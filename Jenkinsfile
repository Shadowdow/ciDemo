pipeline {
    agent any
    options{
        retry(3)
        timeout(time:10, unit: 'MINUTES')
    }
    stages {
       stage('start') {
          steps {
            echo '构建开始...'
          }
        }
       stage('build') {
          //  在这里也可以设置一些条件，例如分支名称过滤等
          steps {
            // Windows下使用bat启动脚本，linux或manOS下使用sh启动脚本
            sh 'powershell ./deploy.ps1'
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
