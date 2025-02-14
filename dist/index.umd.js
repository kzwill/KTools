(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MyJsLib = {}));
})(this, (function (exports) { 'use strict';

  function add(a, b) {
    return a + b;
  }
  function subtract(a, b) {
    return a - b;
  }

  // 获取当前的日期
  function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
  }

  exports.add = add;
  exports.getCurrentDate = getCurrentDate;
  exports.subtract = subtract;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
