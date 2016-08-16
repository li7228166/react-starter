### 项目特征：
- 支持Babel编译（体验下一代 JavaScript 写代码的酷爽，解析JSX，ES6，stage-0，以及ES7的提案修饰器@）
- 支持LESS预处理器
- 实现组件级热更新
- 实现代码的热替换，浏览器实时刷新查看效果
- 分离业务功能代码和公共依赖代码
- 单独分离CSS样式文件
- 支持图片、图标字体等资源的编译
- 支持文件MD5戳，解决文件缓存问题
- 支持一键部署项目到服务器

### 项目说明：

没有预置react全家桶，可根据项目需要自行install，公共依赖代码会按照package.json的dependencies配置，提取到vender.[hash:8].js

### 项目开始

```
$ git clone https://github.com/li7228166/react-starter.git
$ cd react-starter
$ npm install（因为中国强，如果速度太慢，可尝试使用[cnpm](https://npm.taobao.org/ "cnpm")）
```

### 预置命令
#### 开发
```
$ npm start
```

浏览器会自动打开 http://localhost:3000
推荐设置chrome为默认浏览器，what？你不用chrome，额……好吧

#### build
```
$ npm run build
```

生成待部署文件到dist目录

#### 发布
```
$ npm run release
```

生成待部署文件到dist目录，并打开浏览器 http://localhost:8080 ，在本地预览待部署的项目


#### 部署
```
$ npm run deploy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "ssh": {
    "host": "xx.xx.xx.xx",  //服务器IP
    "username": "xxx",      //用户名
    "password": "xxx",      //登录密码
    "port": "xxx",          //端口
    "remotePath": "/xx/xx"  //上传到服务器的哪个目录
  }
}
```
在生成待部署文件到dist目录，并直接部署到指定服务器