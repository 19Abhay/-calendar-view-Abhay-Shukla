import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(ts|tsx|js|jsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  framework: { name: '@storybook/nextjs', options: {} },

  docs: {}
};
export default config;
