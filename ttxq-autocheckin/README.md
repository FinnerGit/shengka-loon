# 天天象棋自动签到插件

## 功能
- 自动执行天天象棋每日签到
- 自动领取多个日常奖励（基于抓包记录）
- 支持定时执行（默认每天上午9点）
- 详细执行日志和状态通知
- 基于实际抓包数据，确保请求真实性

## 快速安装

### 方法一：一键安装（推荐）
1. 打开LOON应用
2. 进入「插件」页面
3. 点击右上角「+」添加插件
4. 粘贴以下URL：
```
https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_Loon.plugin
```

### 方法二：手动配置
将以下配置添加到LOON配置文件中：

```ini
[Script]
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_AutoCheckin_Loon.js, timeout=120, tag=天天象棋自动签到

[MITM]
hostname = szextshort.weixin.qq.com, szminorshort.weixin.qq.com
```

## 文件说明

### 核心文件
- `TTXQ_Loon.plugin` - **主插件文件**（必须使用这个）
- `TTXQ_AutoCheckin_Loon.js` - 主脚本文件（包含完整签到逻辑）

### 辅助文件
- `TTXQ_AutoCheckin.js` - 简化版脚本（备用）
- `TTXQ_Config.conf` - 配置示例
- `INSTALL.md` - 详细安装指南

## 请求说明

插件基于实际抓包记录生成，包含以下关键请求：

1. **签到请求**（609字节）- 对应周一签到
2. **奖励请求1**（620字节）- 对应第一个奖励
3. **奖励请求2**（620字节）- 对应第二个奖励  
4. **奖励请求3**（703字节）- 对应第三个奖励

每个请求都使用真实的请求体数据，确保与微信小程序完全兼容。

## 工作原理

1. **定时触发**：每天9:00自动执行
2. **序列请求**：依次发送4个签到/奖励请求
3. **模拟真实**：使用与微信客户端相同的请求头和请求体
4. **结果通知**：执行完成后发送通知

## 配置选项

### 修改执行时间
编辑插件文件，修改cron表达式：
- `"0 9 * * *"` - 每天9:00（默认）
- `"0 12 * * *"` - 每天12:00
- `"0 9,18 * * *"` - 每天9:00和18:00

### 调试模式
默认开启调试，如需关闭：
```javascript
const DEBUG = false; // 修改为false关闭日志
```

## 注意事项

1. **MITM必需**：必须启用LOON的MITM功能
2. **证书信任**：需要在系统设置中信任LOON证书
3. **首次测试**：建议先手动执行测试
4. **网络要求**：需要稳定的网络连接

## 更新日志

### v1.1 (2026-04-11)
- 修复插件格式问题
- 优化LOON兼容性
- 简化安装流程

### v1.0 (2026-04-11)
- 初始版本发布
- 基于抓包记录生成
- 包含4个关键请求

## 技术支持

如有问题：
1. 查看LOON日志获取详细错误信息
2. 检查MITM配置是否正确
3. 确认网络连接正常
4. 在GitHub仓库提交Issue