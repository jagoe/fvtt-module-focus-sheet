module.exports = {
  'color': true,
  'diff': true,
  'full-trace': true,
  'extension': ['ts'],
  'reporter': 'spec',
  'require': [
    'ts-node/register',
    // 'tests/.env.test.js', // load the test environment variables before tests start
  ],
  'spec': './test/**/*.test.ts',
  'exclude': 'node_modules',
}
