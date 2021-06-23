const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  webpack: (config, env) => {
    config.optimization.splitChunks.name = 'vendors';

    if (env === 'development') {
      config.output.publicPath = 'http://localhost:3000/';

      config.plugins.push(
        new BundleTracker({
          path: __dirname,
          filename: 'webpack-stats.dev.json',
        }),
      );

      console.log('config.entry:', typeof config.entry);
      config.entry = [config.entry];
      config.entry = config.entry.filter(entry => !entry.includes('webpackHotDevClient'));
      config.entry.push(require.resolve('webpack-dev-server/client') + '?http://localhost:3000');
      config.entry.push(require.resolve('webpack/hot/dev-server'));
    } else if (env === 'production') {
      console.info(config.entry, 'SHEEEEESH',  config.output.chunkFilename);
      config.output.publicPath = '/static/bundles/';
      config.output.chunkFilename = '[id].js';

      config.plugins.push(
        new BundleTracker({
          path: __dirname,
          filename: 'webpack-stats.prod.json',
        }),
      );
    }

    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {'Access-Control-Allow-Origin': '*'};
      return config;
    };
  },
};
