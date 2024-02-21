import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // generate minified bundle
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss'; // so we can use tailwind
import tailwind from 'rollup-plugin-tailwindcss';

const packageJson = require('./package.json');

// format cjs = CommonJS

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'niagads-react-viz'
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss(),
        terser(),
        tailwind({
            input: 'path/to/entry.css', // required
            // Tailor the emitted stylesheet to the bundle by removing any unused CSS
            // (highly recommended when packaging for distribution).
            purge: false,
          }),
    ]
}