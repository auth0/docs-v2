import type { Preview } from '@storybook/react-vite';
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
        <div 
          key={darkMode} 
          className={`adu ${darkMode === 'dark' ? 'dark' : ''}`} 
          style={{ colorScheme: darkMode }}
        >
          <div className="bg-background text-foreground p-4 transition-colors duration-200">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
