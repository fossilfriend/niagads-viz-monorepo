import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser"; // generate minified bundle
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer"; // generate bundle stats
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
//import tailwind from 'rollup-plugin-tailwindcss';
import tailwindcss from 'tailwindcss';


import { getFiles } from "./scripts/buildUtils";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default [
    {
        input: [
            "./src/index.ts",
            ...getFiles("./src/common", extensions),
            ...getFiles("./src/components", extensions),
        ],
        output: [
            {
                format: "esm",
                sourcemap: true,
                dir: "dist",
                preserveModules: true,
                preserveModulesRoot: "src",
            },
        ],
        external: [/node_modules/],
        plugins: [
            resolve(),
            commonjs(),
            external(),
            typescript({
                tsconfig: "./tsconfig.build.json",
                exclude: ["**/__deprecated__/"]
            }),
            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
                plugins: [tailwindcss('./tailwind.config.js')],
            }),
            terser(),
            visualizer({
                filename: "bundle-analysis.html",
                open: false,
            }),
        ],
    },
    {
        input: ["./dist/dts/index.d.ts"],
        output: [{ file: "./dist/index.d.ts", format: "es" }],
        plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/dts" })],
        external: [/\.css$/u] // HACK: Fix for this problem https://github.com/Swatinem/rollup-plugin-dts/issues/165]
    },
];

/*

// external: ['react', 'react-dom']
tailwind({
    input: './src/index.css',
    purge: false,
}),



        */
