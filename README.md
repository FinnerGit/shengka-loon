# shengka-loon
LOON自动签到插件集合

## 插件列表

### 1. 声荐签到
- 文件: `shengka_daily.plugin`
- 描述: iOS听书应用声荐的自助签到

### 2. 天天象棋自动签到
- 目录: `ttxq-autocheckin/`
- 描述: 微信小程序天天象棋的自动签到和奖励领取
- 功能:
  - 每日自动签到
  - 自动领取多个日常奖励
  - 支持定时执行（每天上午9点）
  - 详细日志和通知

#### 文件说明
- `TTXQ_AutoCheckin_Improved.plugin` - 主插件文件（推荐）
- `TTXQ_AutoCheckin.plugin` - 原始插件文件（包含所有请求）
- `TTXQ_AutoCheckin.js` - JavaScript脚本文件
- `TTXQ_Config.conf` - LOON配置文件示例
- `README.md` - 详细说明文档
- `INSTALL.md` - 安装指南

#### 安装方法
1. 打开LOON应用，进入「插件」页面
2. 点击右上角「+」添加插件
3. 使用以下URL安装：
   ```
   https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_AutoCheckin_Improved.plugin
   ```

#### 注意事项
- 需要开启微信小程序的网络请求抓取权限
- 确保LOON的MITM功能正常工作
- 首次使用建议开启调试模式查看日志

## 开发说明
这些插件基于实际抓包记录生成，确保请求的真实性。

## 更新日志
- 2026-04-11: 添加天天象棋自动签到插件
- 初始版本: 声荐签到插件
