const BASE_URL = "https://xcx.myinyun.com:4438";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEzNzI1ODg3Mjk0IiwiZGV2aWNlSWQiOiJFN0Q5QzVEQy0wMjA4LTQ1NTgtQUFFMS04NEI5NjdBNDBCNzIiLCJsb2dpblRpbWUiOjE3Njg0NjM4NzkyNDYsImlhdCI6MTc2ODQ2Mzg3OX0.TAG9c7ZjH7LoRbQcPht8_uLx3Fm1232ouIMk7xkJFNg";
const USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 26_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.70(0x18004633) NetType/4G Language/zh_CN";
const REFERER = "https://servicewechat.com/wxa25139b08fe6e2b6/23/page-frame.html";

function notify(title, subtitle, body) {
  if (typeof $notification !== "undefined") {
    $notification.post(title, subtitle || "", body || "");
  }
  console.log([title, subtitle, body].filter(Boolean).join(" | "));
}

function headers() {
  return {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    "Referer": REFERER,
  };
}

function request(options) {
  return new Promise((resolve, reject) => {
    const method = (options.method || "GET").toLowerCase();
    $httpClient[method](options, (error, response, data) => {
      if (error) return reject(error);
      resolve({ response, data });
    });
  });
}

async function getJSON(method, path, body) {
  const { data } = await request({
    method,
    url: `${BASE_URL}${path}`,
    headers: headers(),
    body,
  });
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

async function getFlowerTime() {
  return await getJSON("GET", "/napi/flower/time");
}

async function claimFlower() {
  return await getJSON("POST", "/napi/flower/get", "{}");
}

async function getRemainGiftNum() {
  return await getJSON("GET", "/napi/gift/remainGiftNum");
}

async function drawGift() {
  return await getJSON("PUT", "/napi/gift", "{}");
}

async function runFlower() {
  const flowerTime = await getFlowerTime();
  if (flowerTime !== true) {
    return "小红花今日不可领取或已领取";
  }
  const result = await claimFlower();
  if (result === true) {
    return "小红花领取成功";
  }
  return `小红花结果：${JSON.stringify(result)}`;
}

async function runGift() {
  const remain = await getRemainGiftNum();
  const count = Number(remain?.data || 0);
  if (count <= 0) {
    return "每日抽奖今日已完成";
  }
  const result = await drawGift();
  const prize = result?.data || {};
  const prizeName = prize.prizeName || "抽奖完成";
  const prizeNum = prize.prizeNum != null ? ` ×${prize.prizeNum}` : "";
  return `每日抽奖成功：${prizeName}${prizeNum}`;
}

async function main() {
  try {
    const messages = [];
    messages.push(await runFlower());
    messages.push(await runGift());
    notify("声荐小助手", "每日任务完成", messages.join("\n"));
  } catch (e) {
    notify("声荐小助手", "每日任务失败", String(e));
  } finally {
    $done({});
  }
}

main();
