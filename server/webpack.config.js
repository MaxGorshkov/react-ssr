const path = require('path');

module.exports = function(env, argv) {
  
  // default to the server configuration
  const base = {
    entry: './index.tsx',
    output: {
      filename: 'server.js',
      // path needs to be an ABSOLUTE file path
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
              },
            }]
        },
        {
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ]
    },
  }
  
  // server-specific configuration
  if (env.platform === 'server') {
    base.target = 'node';
  }

  return base;
}
