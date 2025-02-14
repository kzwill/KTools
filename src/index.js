export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 获取当前的日期
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
