module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
    {
      sourceMaps: true,
    },
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      // '@babel/plugin-transform-runtime',
      // {
      //   regenerator: true,
      // },
    ],
  ],
}
