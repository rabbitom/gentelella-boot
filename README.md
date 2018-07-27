# 快速创建基于Gentelella的管理后台项目

[Gentelella](https://github.com/puikinsh/gentelella)是一个基于Bootstrap 3及大量其他开源组件构建的完全开源、免费的后台管理页面框架。

使用方法：
```
npm install
gulp init # 将gentelella的内容从npm包里复制出来并调整目录结构，放在src目录中
gulp src # 启动browser-sync查看源文件
gulp build # 将用到的内容打包，放到dist目录中
gulp clean # 删除dist目录
gulp # 打包，启动browser-sync查看dist目录，并监听src中html文件的变化
```