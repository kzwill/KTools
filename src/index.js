/**
 * 异步任务池
 * @param {Array} tasks - 任务数组，每个任务是一个返回 Promise 的函数
 * @param {Object} options - 配置选项
 * @param {number} [options.limit=2] - 并发执行的任务数量
 * @param {function} [options.onProgress=null] - 每个任务完成时的回调函数，参数为 { index, done, total, elapsed }
 * @param {function} [options.onError=null] - 每个任务失败时的回调函数，参数为 (err, index, task)
 * @returns {Promise<Array>} - 包含每个任务执行结果的数组
 */
export async function asyncPool(
  tasks,
  {
    limit = 2,
    onProgress = null,
    onError = null,
  } = {}
) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }

  const total = tasks.length;
  let done = 0;

  const executing = new Set();
  const ret = Array(total);

  // 记录每个任务的开始时间
  const startTimeMap = new Map();

  const runTask = (task, index) => {
    startTimeMap.set(index, performance.now());

    const p =
      typeof task === "function"
        ? Promise.resolve().then(task)
        : Promise.resolve(task);

    p.then(res => {
      ret[index] = { result: res, error: null };
    })
      .catch(err => {
        onError && onError(err, index, task);
        ret[index] = { result: null, error: err };
      })
      .finally(() => {
        executing.delete(p);
        done++;

        const end = performance.now();
        const elapsed = end - startTimeMap.get(index);

        // 返回耗时
        onProgress &&
          onProgress({
            index,
            done,
            total,
            elapsed, // 当前任务的耗时（毫秒）
          });
      });

    executing.add(p);
    return p;
  };

  for (let i = 0; i < total; i++) {
    const p = runTask(tasks[i], i);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  await Promise.allSettled(executing);

  return ret;
}




