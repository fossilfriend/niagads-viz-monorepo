import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser"; // generate minified bundle
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer"; // generate bundle stats
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

// import tailwind from 'rollup-plugin-tailwindcss';

import { getFiles } from "./scripts/buildUtils";

const extensions = [".js", ".ts", ".jsx", ".tsx"];
const declarations = ["*.d.ts", "**/*.d.ts", "**/*.d.cts", "**/*.d.mts"];

// format cjs = CommonJS

export default [
    {
        input: [
            "./src/index.ts",
            ...getFiles("./src/common", extensions),
            ...getFiles("./src/components", extensions),
            ...getFiles("./src/hooks", extensions),
            ...getFiles("./src/utils", extensions),
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
            }),
            postcss(),
            terser(),
            visualizer({
                filename: "bundle-analysis.html",
                open: false,
            }),
        ],
    },
    {
        input: ["./dist/dts/src/index.d.ts"],
        output: [{ file: "./dist/index.d.ts", format: "es" }],
        plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/dts" })],
    },
];
/*
*/
// external: ['react', 'react-dom']
/*
tailwind({
            input: 'path/to/entry.css', // required
            // Tailor the emitted stylesheet to the bundle by removing any unused CSS
            // (highly recommended when packaging for distribution).
            purge: false,
        }),
        */
