import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        exclude: ['**/*.test.ts'],
      }),
    ],
    preserveModules: true,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        preserveModulesRoot: 'src',
      },
    ],
  },
];
