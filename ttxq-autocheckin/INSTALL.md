# 天天象棋自动签到插件安装指南

## 文件说明
1. `TTXQ_AutoCheckin_Improved.plugin` - 主插件文件（推荐）
2. `TTXQ_AutoCheckin.plugin` - 原始插件文件（包含所有请求）
3. `TTXQ_AutoCheckin.js` - JavaScript脚本文件
4. `TTXQ_Config.conf` - LOON配置文件示例

## 安装方法

### 方法一：安装插件（推荐）
1. 打开LOON应用
2. 进入「插件」页面
3. 点击右上角「+」添加插件
4. 粘贴插件URL（部署到GitHub后）或导入本地文件
5. 插件将每天上午9点自动执行

### 方法二：配置脚本
1. 编辑LOON配置文件
2. 添加以下内容：

```
[Script]
# 定时执行
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/TTXQ_AutoCheckin.js, timeout=60, tag=天天象棋签到

# 或使用HTTP-Response拦截
# pattern = https?://szextshort\.weixin\.qq\.com/mmts/, tag=天天象棋API, script-path=https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/TTXQ_AutoCheckin.js

[MITM]
hostname = szextshort.weixin.qq.com, szminorshort.weixin.qq.com
```

## 注意事项
1. 需要启用MITM并信任证书
2. 首次使用建议开启调试模式
3. 如果签到失败，请检查日志
4. 请求体基于实际抓包，可能需要定期更新

## 手动测试
在LOON插件页面，点击插件右侧的「▶」按钮手动执行测试。
