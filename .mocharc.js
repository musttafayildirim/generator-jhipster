module.exports = {
  recursive: true,
  reporter: 'spec',
  slow: 0,
  timeout: 30000,
  ui: 'bdd',
  extension: ['js', 'spec.cjs', 'spec.mjs', 'spec.ts', 'spec.mts'],
  require: ['mocha-expect-snapshot/old-format'],
  // Resolve absolute path for test with fork and different cwd.
  loader: require.resolve('@esbuild-kit/esm-loader'),
  parallel: true,
};
