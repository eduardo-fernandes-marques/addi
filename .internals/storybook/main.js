const path = require('path');

module.exports = {
  stories: ['../../src/*.stories.(mdx|tsx)'],
  addons: ['@storybook/preset-scss', '@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve('../../src')];

    config.module.rules.push({
      test: [/\.scss$/, /\.module.scss$/],
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, '../../src/')],
        },
      },
    });

    return config;
  },
};
