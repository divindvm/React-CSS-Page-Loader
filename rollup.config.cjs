const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const babel = require('@rollup/plugin-babel');

const packageJson = require('./package.json');

module.exports = {
  input: 'index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
  external: ['react', 'react-dom', 'framer-motion'],
};