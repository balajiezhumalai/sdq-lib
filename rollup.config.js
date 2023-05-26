const { DEFAULT_EXTENSIONS } = require('@babel/core');
const babel  = require( '@rollup/plugin-babel');
const typescript  = require( 'rollup-plugin-typescript2');
const commonjs  = require( '@rollup/plugin-commonjs');
const external  = require( 'rollup-plugin-peer-deps-external');
const postcss  = require( 'rollup-plugin-postcss');
const resolve  = require( '@rollup/plugin-node-resolve');
const url  = require( '@rollup/plugin-url');
const svgr  = require( '@svgr/rollup');
const { terser }  = require( 'rollup-plugin-terser');
const typescriptEngine  = require( 'typescript');
// const pkg  = require( './package.json') assert { type: 'json' };

module.exports = {
    input: './src/index.ts',
    output: [
        {
            file: "dist/index.js",
            format: 'cjs',
            exports: 'named',
            sourcemap: false,
        },
        {
            file: "dist/index.es.js",
            format: 'es',
            exports: 'named',
            sourcemap: false,
        },
    ],
    plugins: [
        postcss({
            plugins: [],
            minimize: true,
        }),
        external({
            includeDependencies: true,
        }),
        typescript({
            tsconfig: './tsconfig.json',
            typescript: typescriptEngine,
            sourceMap: false,
        }),
        commonjs(),
        babel({
            extensions: [...DEFAULT_EXTENSIONS, '.ts', 'tsx'],
            babelHelpers: 'runtime',
            exclude: /node_modules/,
        }),
        url(),
        svgr(),
        resolve(),
        terser(),
    ],
    watch: {
        clearScreen: false,
    },
}