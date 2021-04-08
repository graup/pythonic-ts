import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import depsExternal from 'rollup-plugin-node-externals';

const extensions = ['.ts'];

const plugins = [
  depsExternal({ deps: true, include: [/@babel\/runtime/] }),
  nodeResolve({ extensions }),
  babel({
    extensions,
    babelHelpers: 'runtime',
    exclude: ['**/*.test.ts'],
  }),
];

export default [
  {
    input: 'src/index.ts',
    plugins,
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
