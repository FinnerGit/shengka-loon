# 天天象棋自动签到插件安装指南

## 文件说明
1. `TTXQ_Loon.plugin` - **主插件文件**（必须使用这个）
2. `TTXQ_AutoCheckin_Loon.js` - 主脚本文件（由插件引用）
3. `TTXQ_AutoCheckin.js` - 简化版脚本文件
4. `TTXQ_Config.conf` - LOON配置文件示例

## 安装方法（最简单）

### 方法一：直接安装插件（推荐）
1. 打开LOON应用
2. 进入「插件」页面
3. 点击右上角「+」添加插件
4. 粘贴以下URL：
   ```
   https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_Loon.plugin
   ```
5. 插件会自动配置定时任务和MITM

### 方法二：手动配置
如果你喜欢手动配置，可以将以下内容添加到LOON配置文件：

```ini
[Script]
# 定时执行：每天上午9点
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_AutoCheckin_Loon.js, timeout=120, tag=天天象棋自动签到, enable=true

# HTTP响应拦截（可选）
http-response ^https?:\/\/szextshort\.weixin\.qq\.com\/mmtls\/ script-path=https://raw.githubusercontent.com/FinnerGit/shengka-loon/main/ttxq-autocheckin/TTXQ_AutoCheckin_Loon.js, requires-body=true, timeout=120, tag=天天象棋API拦截

[MITM]
# 需要MITM的主机
hostname = szextshort.weixin.qq.com, szminorshort.weixin.qq.com
```

## 配置说明

### 定时任务
- 默认时间：每天上午9:00
- 可修改：在插件中编辑cron表达式
- 例如：`"0 9 * * *"` 表示每天9:00

### MITM配置
插件已自动配置以下主机：
- `szextshort.weixin.qq.com`
- `szminorshort.weixin.qq.com`

请确保LOON的MITM功能已启用，并信任相关证书。

## 首次使用步骤

1. **安装插件**：使用方法一安装 `TTXQ_Loon.plugin`
2. **启用MITM**：确保LOON的MITM功能已开启
3. **信任证书**：在系统设置中信任LOON的证书
4. **测试执行**：在插件页面点击「▶」手动测试
5. **查看日志**：在LOON日志面板查看执行情况

## 常见问题

### 1. 插件安装后无法运行
- 确保安装的是 `TTXQ_Loon.plugin`，不是 `.js` 文件
- 检查MITM是否已启用
- 查看LOON日志获取详细错误信息

### 2. 签到失败
- 检查网络连接
- 确认微信小程序正常运行
- 查看请求日志，确认请求是否发送成功

### 3. 如何修改执行时间
- 编辑插件，修改cron表达式
- 例如：`"0 12 * * *"` 表示每天中午12点

### 4. 如何查看执行日志
- 打开LOON应用
- 进入「日志」页面
- 筛选标签为「天天象棋自动签到」

## 高级配置

### 自定义请求
如果需要修改请求参数，可以编辑 `TTXQ_AutoCheckin_Loon.js` 文件中的 `CHECKIN_REQUESTS` 数组。

### 调试模式
默认开启调试模式，会在日志中显示详细信息。如需关闭，修改 `DEBUG = false`。

## 技术支持
如有问题，请查看GitHub仓库的Issues页面或提交新问题。