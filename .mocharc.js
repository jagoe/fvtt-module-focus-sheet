module.exports = {
  'color': true,
  'diff': true,
  'full-trace': true,
  'extension': ['ts'],
  'reporter': 'spec',
  'require': ['ts-node/register', 'tsconfig-paths/register'],
  'spec': './test/**/*.test.ts',
  'exclude': 'node_modules',
}
