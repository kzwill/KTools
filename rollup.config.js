// rollup.config.js
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs', // CommonJS 版本，适用于 Node 环境
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm', // ES Module 版本
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd', // UMD 版本，可直接在浏览器中使用
      name: 'MyJsLib', // 全局变量名
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env']
    })
  ]
};
