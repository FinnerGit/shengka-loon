// 天天象棋自动签到脚本 v1.2
// 完全兼容LOON环境
// 基于实际抓包记录生成

const DEBUG = true;

function log(...args) {
    if (DEBUG) {
        console.log(`[天天象棋]`, ...args);
    }
}

// API配置
const API_CONFIG = {
    host: "szextshort.weixin.qq.com",
    baseHeaders: {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Connection": "Keep-Alive",
        "Content-Type": "application/octet-stream",
        "Host": "szextshort.weixin.qq.com",
        "Upgrade": "mmtls",
        "User-Agent": "MicroMessenger Client"
    }
};

// 签到请求配置 - 精简版本，包含关键请求
const CHECKIN_REQUESTS = [
    {
        id: 1,
        name: "签到请求1",
        method: "POST",
        path: "/mmtls/4e3f9f89",
        bodyBase64: "GfEEAKEAAACdAQTxAQCo2bKqzYbFDrVG0yYddAULvopFhlOlRHFCuQq8hnZY5zJp2Z6pAAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAkK1sDvliORhtf8iqXhNqyhhp6chTzq49vvbUv4S+VhQJZ8qieF/EEAXG0P8xqlXAzhveNOE4ORoUVpeue1BK88m/XLfHDG4ryb1E/rKqvFt2gSG2CeJCwfe2es6V/4wP1i7Wujj7DSUD50bvb9w1jmblY2UMpf6yrFLJ8PfqZs6fVTQY9xIbhfF5Mp8gEPeQOGuO8auIhasaVF29UIkvSimwuFux7kbe7/BZvtsLcHCRgd4YU1eFUwk+DsbBRJTS+JZHvn+A0+HG0KQTNURfzxJTaAcrs4WIEzlFno/2VGm+FxogKqVw4qo5bre8MfzOpc+Jin1NEE+tKx783U6VW0ZGuytEPiRydK22o3axqVXF4qv5Nh7wAnr5m7st40yUIbiP3otM3XVgNXN0VxWBNfLUb9uQFSXx1IJCEOqC0HUln8kMSYkiuFMDErBlc3GC3+oSFbkBl3Zkzh8DQLKNiEJ++/EWNhGqMzIskIrPtUuSxF0ySVj8bZVwJ7evDKGTDZUm5YY5M+ISmkx3CWa24WK/PG3wfBxpHVkUV8QQAF2bZb/4iFtO3tmmCfu/xeo1C+JtoFSw/",
        size: 609
    },
    {
        id: 2,
        name: "签到请求2",
        method: "POST",
        path: "/mmtls/4e48995e",
        bodyBase64: "GfEEAKEAAACdAQTxAQCo58pCl4rsPRmsNnnIvidzxVAZftAgE/73sQg7nBQ1t8tp2Z7MAAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAk4bsCcrj/8Xj8uW8KIdPBecis8OfJFyw44LpU+OIsxgmiMfBhF/EEAXzhC04fVmDV3xu6gBh6FRNUu+VtyabwdVXKL0isnZAboQ1U3eohhikoJ2SOv+Pz772D4p4YEyiYM6Gvoe0/XzmwPUOK9vDr3hKoF+kEII4lN5PmKzVDUl9AMdBZYhEv+yX1tFE5o10LXXAlfh9VSEwalOWE32/+GGD3wRVJbcUnEw3vnu0e5Lm//G7q/D39CT53nkcpqnN9WWUeVsBEWAvFi/4OztdurK/GhF0wDfS16WIUJjvV1nEZibDklHDlOXJ5gWGyHMf9oILTHIecsDjVJgMMoFG/EvteDyHGpmyXJ/HXjF9fKIWy8fN92bI0nkUqSspjgFue0WTKP8CpWddQcquNEL714DPJTtjvWe9FNThuv5rcS+BqCfsAeiWPF4wdH/YCBAkhci5yKdLjcLwMoaVZ9awb25BJL5d0cs8igNx//zhLcamWy1qmiK/HKJ6z01507mhU3ifx9yG/enAlrki0sXBPfBQFEIn0YT8uZqTbcuVFcrVfBHV27RXxBAAXV5Eq1Om4WT2fBbgf3LYDtnIfQmSagao=",
        size: 620
    },
    {
        id: 3,
        name: "签到请求3",
        method: "POST",
        path: "/mmtls/4e535ec4",
        bodyBase64: "GfEEAKEAAACdAQTxAQCoDX2Xl2CIb4N1KvsDC++v+7rzHVA39HhB9fdvfbi69NNp2Z72AAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAk5IjdJyB+UWOvatODFsQfIghDW/BjEA933O17A2wC7jTS78QJF/EEAXyl9/o5Dk19YOsxcW4XZF/IooYIMFQjrMahZOlDU55Ug92cdFQj/w/sI8IQbrlnQPTvnAHTWygKQPLoYyOMzDFRm8OwHL9tAJSfARX1d/lpaEN+IgSWnxRX52bwFusAVoOwJOzbX0ZoZyKwzb5wSTG3qwWyOPtzrRBM1sjGckciRpDJKcx8KVPLGrOtJDcpNnWK9EM2qQkHFa6nAGdReVxfvyRd3oXpPhQ0DYARR5eba6nJo9hWLyf44+45poeyy0D2dFawfx2NFTAmbb8Iv1aGGPkkQetdsMKt0i+bZMJfzc2vKJpWPBy8UIsErSeKM/QnEhXVCKPnKfIGPiiTDtXBg3VYMBtK1pTcZT5s7XsNuYzxv6vYHzYukkgiIGsKWgBeK1xj0xz++NfMGLHnejA0vSboJkKaiwibyaQkIpiFTjBISeDWt7q/TIX2WSGKCwCaeiT1fFKnnZXPRx59Q9MxofSiB7k15kfQ2SbCwUF3VmvRhPHoSKcN56YeiRXxBAAXHgvMsp8+WpaY5/Hf2bVWqdVLDhNRXl4=",
        size: 620
    }
];

// 简单的Base64解码（兼容LOON环境）
function base64ToBytes(base64) {
    try {
        // 尝试使用内置的base64解码
        if (typeof $base64 !== 'undefined') {
            return $base64.decode(base64);
        }
        
        // 备用：简单的base64解码
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    } catch (error) {
        log(`Base64解码失败: ${error}`);
        // 返回原始字符串作为后备
        return base64;
    }
}

// HTTP请求函数（兼容LOON的$httpClient）
function httpRequest(options) {
    return new Promise((resolve, reject) => {
        if (typeof $httpClient === 'undefined') {
            reject(new Error('$httpClient is not available'));
            return;
        }
        
        const method = (options.method || 'GET').toLowerCase();
        if (!$httpClient[method]) {
            reject(new Error(`HTTP method ${method} not supported`));
            return;
        }
        
        $httpClient[method](options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve({ response, body });
            }
        });
    });
}

// 执行单个请求
function executeRequest(requestConfig) {
    return new Promise((resolve) => {
        log(`执行请求: ${requestConfig.name} (ID: ${requestConfig.id})`);
        
        const url = `https://${API_CONFIG.host}${requestConfig.path}`;
        log(`URL: ${url}`);
        
        const requestOptions = {
            url: url,
            method: requestConfig.method,
            headers: API_CONFIG.baseHeaders,
            timeout: 10000
        };
        
        // 处理请求体
        if (requestConfig.bodyBase64) {
            try {
                const decodedBody = base64ToBytes(requestConfig.bodyBase64);
                if (decodedBody instanceof Uint8Array || typeof decodedBody === 'string') {
                    requestOptions.body = decodedBody;
                } else {
                    requestOptions.body = requestConfig.bodyBase64;
                }
            } catch (error) {
                log(`请求体处理失败: ${error}`);
                requestOptions.body = requestConfig.bodyBase64;
            }
        }
        
        httpRequest(requestOptions)
            .then(({ response }) => {
                log(`响应状态码: ${response.status}`);
                if (response.status >= 200 && response.status < 300) {
                    log(`请求成功`);
                    resolve({ success: true, statusCode: response.status });
                } else {
                    log(`请求失败，状态码: ${response.status}`);
                    resolve({ success: false, statusCode: response.status });
                }
            })
            .catch((error) => {
                log(`请求异常: ${error}`);
                resolve({ success: false, error: String(error) });
            });
    });
}

// 延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 执行签到
async function executeCheckin() {
    log("开始执行天天象棋签到");
    
    const results = [];
    let successCount = 0;
    
    for (let i = 0; i < CHECKIN_REQUESTS.length; i++) {
        const request = CHECKIN_REQUESTS[i];
        log(`\n--- 执行请求 ${i + 1}/${CHECKIN_REQUESTS.length} ---`);
        
        const result = await executeRequest(request);
        results.push(result);
        
        if (result.success) {
            successCount++;
        }
        
        // 请求间延迟
        if (i < CHECKIN_REQUESTS.length - 1) {
            log(`等待1秒...`);
            await delay(1000);
        }
    }
    
    log(`\n签到完成: ${successCount}/${CHECKIN_REQUESTS.length} 成功`);
    
    return { successCount, total: CHECKIN_REQUESTS.length, results };
}

// 通知函数
function notify(title, subtitle, body) {
    if (typeof $notification !== 'undefined') {
        $notification.post(title, subtitle, body);
    } else if (typeof $msg !== 'undefined') {
        $msg(title, subtitle, body);
    }
    console.log([title, subtitle, body].filter(Boolean).join(' | '));
}

// 主函数
async function main() {
    log("=== 天天象棋自动签到脚本 ===");
    
    try {
        const result = await executeCheckin();
        
        const title = "天天象棋签到";
        let subtitle, message;
        
        if (result.successCount === result.total) {
            subtitle = "签到成功";
            message = `所有请求执行成功！\n总计: ${result.total}个请求`;
        } else if (result.successCount > 0) {
            subtitle = `部分成功 (${result.successCount}/${result.total})`;
            message = `成功: ${result.successCount}个\n失败: ${result.total - result.successCount}个\n总计: ${result.total}个请求`;
        } else {
            subtitle = "签到失败";
            message = `所有请求都失败了\n请检查网络或配置`;
        }
        
        message += `\n\n详细日志请查看LOON日志面板`;
        
        notify(title, subtitle, message);
        
    } catch (error) {
        log(`脚本执行错误: ${error}`);
        notify("天天象棋签到", "执行错误", String(error));
    } finally {
        $done({});
    }
}

// 启动
main();