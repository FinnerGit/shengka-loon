# 天天象棋自动签到插件

## 功能
- 自动执行天天象棋每日签到
- 自动领取多个日常奖励
- 支持定时执行（每天上午9点）

## 安装方法

### 方法一：LOON插件安装
1. 打开LOON应用
2. 进入「插件」页面
3. 点击右上角「+」添加插件
4. 粘贴以下URL：
```
https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/TTXQ_AutoCheckin.plugin
```

### 方法二：配置文件安装
1. 将 `TTXQ_Config.conf` 内容合并到你的LOON配置文件中
2. 确保已启用MITM并信任相应证书

## 请求说明
插件基于实际抓包记录生成，包含以下请求模式：
- `POST /mmtls/4e3f9f89`: 14次请求
- `POST /mmtls/4e981998`: 4次请求
- `POST /mmtls/4e3f5de2`: 11次请求
- `POST /mmtls/4e7d6dc0`: 10次请求
- `POST /mmtls/4e48995e`: 11次请求
- `POST /mmtls/4e54a707`: 5次请求
- `POST /mmtls/4e7daf67`: 1次请求
- `POST /mmtls/4e8939c2`: 8次请求
- `POST /mmtls/4e535ec4`: 9次请求
- `POST /mmtls/4e933a33`: 3次请求
- `POST /mmtls/4e73aef6`: 3次请求
- `POST /mmtls/4e88f81b`: 10次请求
- `POST /mmtls/4e64cf20`: 5次请求
- `POST /mmtls/4e736d4f`: 8次请求
- `POST /mmtls/4e74b592`: 1次请求
- `POST /mmtls/4e4022d7`: 2次请求
- `POST /mmtls/4e640a2b`: 5次请求
- `POST /mmtls/4e4f85fb`: 1次请求
- `POST /mmtls/4e92f88c`: 9次请求
- `POST /mmtls/4e732ba8`: 17次请求


## 注意事项
1. 需要开启微信小程序的网络请求抓取权限
2. 确保LOON的MITM功能正常工作
3. 首次使用建议开启调试模式查看日志

## 更新日志
- v1.0.0: 初始版本，基于抓包记录生成
