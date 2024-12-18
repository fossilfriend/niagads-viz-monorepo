import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser"; // generate minified bundle
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import tailwindcss from 'tailwindcss';

export default [
    {
        input: [
            "./src/colors.tsx",
            "./src/errors.tsx",
            "./src/formatters.tsx",
            "./src/types.tsx",
            "./src/utils.tsx",
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
        ],
    },
    {
        input: ["./dist/dts/index.d.ts"],
        output: [{ file: "./dist/index.d.ts", format: "es" }],
        plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/dts" })],
        external: [/\.css$/u] // HACK: Fix for this problem https://github.com/Swatinem/rollup-plugin-dts/issues/165]
    },
];