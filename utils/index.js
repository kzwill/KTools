// 计算初始颜色到目标颜色的 hue-rotate 值
function calculateHueRotate(initialColor, targetColor) {
  // 将初始颜色和目标颜色转换为 HSL 格式
  let initialHSL = hexToHSL(initialColor);
  let targetHSL = hexToHSL(targetColor);

  // 计算色相之间的差异
  let hueDifference = targetHSL.h - initialHSL.h;

  // 调整色相差异的范围在 -180 到 180 度之间
  if (hueDifference > 180) {
    hueDifference -= 360;
  } else if (hueDifference < -180) {
    hueDifference += 360;
  }

  // 返回色相差异值
  return hueDifference;
}

// 将十六进制颜色转换为 HSL 格式
function hexToHSL(hex) {
  // 将十六进制颜色转换为 RGB
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  // 找到 RGB 中的最大和最小值
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // 计算色相
  let h;
  if (max === min) {
    h = 0; // 非彩色
  } else {
    let d = max - min;
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // 计算亮度
  let l = (max + min) / 2;

  // 计算饱和度
  let s;
  if (max === min) {
    s = 0;
  } else {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }

  // 返回 HSL 格式的值
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

module.exports = calculateHueRotate