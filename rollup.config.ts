// rollup.config.ts
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import camelCase from 'lodash.camelcase';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';

const pkg = require('./package.json');

const libraryName = 'image-cropper';

export default {
  // input: `src/${libraryName}.ts`,
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
    },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [json(), typescript({ useTsconfigDeclarationDir: true }), commonjs(), nodeResolve(), sourcemaps(), scss()],
};
