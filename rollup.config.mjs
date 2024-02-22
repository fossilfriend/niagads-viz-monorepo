import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // generate minified bundle
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss'; 
import { visualizer } from 'rollup-plugin-visualizer'; // generate bundle stats

// handling the ambient types - https://stackoverflow.com/a/70111116
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

// import tailwind from 'rollup-plugin-tailwindcss';

import { getFiles } from './scripts/buildUtils';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

// format cjs = CommonJS

export default [{
    input: [
        './src/index.ts',
        ...getFiles('./src/common', extensions),
        ...getFiles('./src/components', extensions),
        ...getFiles('./src/lib', extensions),
        ...getFiles('./src/hooks', extensions),
        ...getFiles('./src/utils', extensions),
    ],
    output: [
        {
            format: 'esm',
            sourcemap: true,
            dir: 'dist',
            preserveModules: true,
            preserveModulesRoot: 'src'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        external(), 
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist'
        }),
        postcss(),
        terser(),       
        visualizer({
            filename: 'bundle-analysis.html',
            open: true,
        }),
    ],
},
{
    input: './dist/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/dts" }),],
}
]

// external: ['react', 'react-dom']
/*
tailwind({
            input: 'path/to/entry.css', // required
            // Tailor the emitted stylesheet to the bundle by removing any unused CSS
            // (highly recommended when packaging for distribution).
            purge: false,
        }),
        */