import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    darkMode: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const darkMode = context.globals.darkMode;

      return (
        <div className={darkMode === 'dark' ? 'dark' : ''}>
          <div className="min-h-screen bg-adu-background p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
