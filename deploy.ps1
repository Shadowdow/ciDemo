# deploy脚本代码
Write-Output "下载npm包"
npm i --registry=http://registry.npm.taobao.org
Write-Output "开始编译"
# 这里使用的是开发模式编译，如果需要生产模式，将末尾的 --env development 去掉就可以了
.\node_modules\.bin\taro build --type weapp --env development
Write-Output "读取版本和编译地址"
$version = Get-Content ./version
Write-Output $version
Write-Output "上传代码"
$path = (Get-Location).Path + "\dist"
$p1 = $version + "@" + $path
Write-Output $path
Write-Output $p1
# 需要修改为你自己的微信web开发者工具安装目录
& 'C:\Program Files (x86)\Tencent\微信web开发者工具\cli' -o $path
Start-Sleep -Seconds 10
& 'C:\Program Files (x86)\Tencent\微信web开发者工具\cli' -u $p1 --upload-desc '自动构建'
Write-Output "关闭当前项目"
& 'C:\Program Files (x86)\Tencent\微信web开发者工具\cli' --close $path
& 'C:\Program Files (x86)\Tencent\微信web开发者工具\cli' --quit
