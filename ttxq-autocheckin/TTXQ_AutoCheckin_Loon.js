// 天天象棋自动签到脚本 v1.1
// 专为LOON环境优化
// 基于实际抓包记录生成

const $ = $substore || {};

// 调试模式
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
        bodyBase64: "GfEEAKEAAACdAQTxAQCo58pCl4rsPRmsNnnIvidzxVAZftAgE/73sQg7nBQ1t8tp2Z7MAAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAk4bsCcrj/8Xj8uW8KIdPBecis8OfJFyw44LpU+OIsxgmiMfBhF/EEAXzhC04fVmDV3xu6gBh6FRNUu+VtyabwdVXKL0isnZAboQ1U3eohhikoJ2SOv+Pz772D4p4YEyiYM6Gvoe0/XzmwPUOK9vDr3hKoF+kEII4lN5PmKzVDUl9AMdBZYhEv+yX1tFE5o10LXXAlfh9VSEwalOWE32/+GGD3wRVJbcUnEw3vnu0e5Lm//G7q/D39CT53nkcpqnN9WWUeVsBEWAvFi/4OztdurK/GhF0wDvS16WIUJjvV1nEZibDklHDlOXJ5gWGyHMf9oILTHIecsDjVJgMMoFG/EvteDyHGpmyXJ/HXjF9fKIWy8fN92bI0nkUqSspjgFue0WTKP8CpWddQcquNEL714DPJTtjvWe9FNThuv5rcS+BqCfsAeiWPF4wdH/YCBAkhci5yKdLjcLwMoaVZ9awb25BJL5d0cs8igNx//zhLcamWy1qsiK/HKJ6z01507mhU3ifx9yG/enAlrki0sXBPfBQFEIn0YT8uZqTbcuVFcrVfBHV27RXxBAAXV5Eq1Om4WT2fBbgf3LYDtnIfQmSagao=",
        size: 620
    },
    {
        id: 3,
        name: "签到请求3",
        method: "POST",
        path: "/mmtls/4e535ec4",
        bodyBase64: "GfEEAKEAAACdAQTxAQCoDX2Xl2CIb4N1KvsDC++v+7rzHVA39HhB9fdvfbi69NNp2Z72AAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAk5IjdJyB+UWOvatODFsQfIghDW/BjEA933O17A2wC7jTS78QJF/EEAXyl9/o5Dk19YOsxcW4XZF/IooYIMFQjrMahZOlDU55Ug92cdFQj/w/sI8IQbrlnQPTvnAHTWygKQPLoYyOMzDFRm8OwHL9tAJSfARX1d/lpaEN+IgSWnxRX52bwFusAVoOwJOzbX0ZoZyKwzb5wSTG3qwWyOPtzrRBM1sjGckciRpDJKcx8KVPLGrOtJDcpNnWK9EM2qQkHFa6nAGdReVxfvyRd3oXpPhQ0DYARR5eba6nJo9hWLyf44+45poeyy0D2dFawfx2NFTAmbb8Iv1aGGPkkQetdsMKt0i+bZMJfzc2vKJpWPBy8UIsErSeKM/QnEhXVCKPnKfIGPiiTDtXBg3VYMBtK1pTcZT5s7XsNuYzxv6vYHzYukkgiIGsKWgBeK1xj0xz++NfMGLHnejA0vSboJkKaiwibyaQkIpiFTjBISeDWt7q/TIX2WSGKCwCaeiT1fFKnnZXPRx59Q9MxofSiB7k15kfQ2SbCwUF3VmvRhPHoSKcN56YeiRXxBAAXHgvMsp8+WpaY5/Hf2bVWqdVLDhNRXl4=",
        size: 620
    },
    {
        id: 4,
        name: "签到请求4",
        method: "POST",
        path: "/mmtls/4e71a1be",
        bodyBase64: "GfEEAKEAAACdAQTxAQCoyWHrnyIrE3pN3BW12egjvZ4Ncn2ycAI2gGSHh+3dFDZp2Z9sAAAAbwEAAABqAA8BAAAAYwEACTqAAAAAAABIAAwsu/jO+j3QpPuIsiIASF6N4xCBFWEmVrpXwZ+1Onw96wm5QNP6STKwZ3L28Z9/ZkewUDhfNOISE2103kAtxM4+cFoRDRM+ZEUnZxciRCxTkfs9qZVrDhnxBAAk5platjwpMOQ7eyrU+rlQsJOCBpsB8XbzubtDlGBoNW+PyTnsF/EEAc/kgMcqiVSWo5fCcDdhPJm2yqiRFTFlkKiqaTOVBzWcCWlslJUcE+7ArauJ6LMhbUmv755sf0W5/z/aCCJpGGlwOA0k3NZg73yibL7OuYuU22jxxZ5tSEsYLkIc8K4b0xqTakmoTXnAGf0grJ0/JbM7vCvFD6/VBZE5jzxBs8aeEpECvmslbVrQgjv+abGxUfVtHe0XXx665kma9pugL4dDF/vPnHh3a5l8LfXOEkaFMG5tjmHSM0hFnJZ/GmVEZD2ZY5QMIVshY3iS0dLNyTvMDu1k2RvlzRJCrhSadwwwtxJII1vLaeRlgrqzWb0lL3guOa1j2MjyKTZWsYNslitwjRWJO/L1jIc7KIjfMnY2rN/ENtWuE24TW6KSM+VpZkkPf+KDOGZ5PYgdCcMbv0QK5s1wd6xZQI2XQvbxhJrusQjKEvUd6j9ovPsgh/cCZBZGf7xkIQli1hRQ1/8vAlTst9D4A0TtL+6Ai7p8aWhL2R4YBJhdpZ80aZ3s5bo0LtjM2l+Ieu/rNsRyl5LRhWZE1rEWGpe5mLaNMRuHHN/COeh/ydo34RzeE6nEh+SB/o+j2MvswX4GbQS5BcRf/LqcZI8szr4PrNHBxo91Yf3tFfEEABeL5eohN8tApjuhy4bJA3Eo/rwvbWI1PA==",
        size: 703
    }
];

// LOON专用的Base64解码
function decodeBase64ForLoon(base64Str) {
    try {
        // LOON环境通常有 $base64 工具
        if (typeof $base64 !== 'undefined') {
            return $base64.decode(base64Str);
        }
        
        // 备用：使用简单的Base64解码
        const binaryStr = atob(base64Str);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
        }
        return bytes;
    } catch (error) {
        log(`Base64解码失败: ${error}`);
        return base64Str;
    }
}

// 执行单个请求
async function executeRequest(requestConfig) {
    try {
        const url = `https://${API_CONFIG.host}${requestConfig.path}`;
        
        log(`执行请求: ${requestConfig.name} (ID: ${requestConfig.id})`);
        log(`URL: ${url}`);
        
        // 准备请求配置
        const requestOptions = {
            url: url,
            method: requestConfig.method,
            headers: API_CONFIG.baseHeaders,
            timeout: 10000
        };
        
        // 处理请求体
        if (requestConfig.bodyBase64) {
            try {
                // 尝试解码Base64
                const decodedBody = decodeBase64ForLoon(requestConfig.bodyBase64);
                if (decodedBody instanceof Uint8Array || decodedBody instanceof ArrayBuffer) {
                    requestOptions.bodyBytes = decodedBody;
                } else {
                    // 如果解码失败或返回字符串，直接使用
                    requestOptions.body = requestConfig.bodyBase64;
                }
            } catch (e) {
                log(`请求体处理失败，使用原始Base64: ${e}`);
                requestOptions.body = requestConfig.bodyBase64;
            }
        }
        
        log(`发送请求...`);
        const response = await $.http.request(requestOptions);
        
        log(`响应状态码: ${response.statusCode}`);
        
        if (response.statusCode >= 200 && response.statusCode < 300) {
            log(`请求成功`);
            return { success: true, statusCode: response.statusCode };
        } else {
            log(`请求失败，状态码: ${response.statusCode}`);
            return { success: false, statusCode: response.statusCode };
        }
        
    } catch (error) {
        log(`请求异常: ${error}`);
        return { success: false, error: String(error) };
    }
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
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    log(`\n签到完成: ${successCount}/${CHECKIN_REQUESTS.length} 成功`);
    
    // 发送通知
    const title = "天天象棋签到";
    const subtitle = successCount === CHECKIN_REQUESTS.length ? "成功" : `部分成功 (${successCount}/${CHECKIN_REQUESTS.length})`;
    const message = `执行完成\n成功: ${successCount}个\n失败: ${CHECKIN_REQUESTS.length - successCount}个\n总计: ${CHECKIN_REQUESTS.length}个请求`;
    
    if (typeof $notification !== 'undefined') {
        $notification.post(title, subtitle, message);
    } else if (typeof $msg !== 'undefined') {
        $msg(title, subtitle, message);
    }
    
    return { successCount, total: CHECKIN_REQUESTS.length, results };
}

// 主函数 - LOON脚本入口
(async () => {
    try {
        const result = await executeCheckin();
        log(`执行结果: ${JSON.stringify(result, null, 2)}`);
        $done({});
    } catch (error) {
        log(`脚本执行错误: ${error}`);
        if (typeof $notification !== 'undefined') {
            $notification.post("天天象棋签到", "执行错误", String(error));
        }
        $done({});
    }
})();