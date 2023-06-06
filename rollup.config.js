import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './v-spliter.ts',
    output: {
      dir: 'lib',
      format: 'umd',
      name: 'VUE_V_SPLITER',
      entryFileNames: '[name].umd.js',
    },
    plugins: [typescript()],
  },
  {
    input: './v-spliter.ts',
    output: {
      dir: 'lib',
      format: 'es',
      name: 'VUE_V_SPLITER',
      entryFileNames: '[name].esm.js',
    },
    plugins: [typescript()],
  }
];