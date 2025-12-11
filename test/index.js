const { asyncPool } = require('../src/index.js');

// --------------------
// 测试用例
// --------------------
const tasks = [
  () => Promise.resolve("task 1 ok"),
  () => new Promise((resolve, reject) => setTimeout(() => reject("task 3 failed!"), 2000)),
  () => new Promise(r => setTimeout(() => r("task 3 ok"), 1000)),
  () => new Promise(r => setTimeout(() => r("task 4 ok"), 4000)),
  () => Promise.resolve("task 5 ok"),
];

asyncPool(tasks, {
  limit: 2,
  onProgress({ index, done, total, elapsed }) {
    console.log(`✅ 任务 ${index} 完成，耗时 ${elapsed.toFixed(0)}ms，进度： ${done}/${total}`);
  },
  onError(err, index) {
    console.log(`❌ 任务 ${index} 失败，错误信息：`, err);
  }
}).then(result => {
  console.log("最终结果数组：", result);
});



