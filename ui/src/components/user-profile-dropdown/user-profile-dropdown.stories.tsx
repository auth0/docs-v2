import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileDropdown } from './user-profile-dropdown';
import { authStore } from '../../stores/auth-store';

const meta: Meta<typeof UserProfileDropdown> = {
  title: 'Components/UserProfileDropdown',
  component: UserProfileDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isMobile: {
      control: 'boolean',
      description: 'Whether to render in mobile mode',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => {
      // Set up authenticated state for stories
      authStore.setAuthenticated(true);
      authStore.setUser({
        email: 'john.doe@example.com',
        name: 'John Doe',
        user_name: 'johnny',
        picture: 'https://avatars.githubusercontent.com/u/1234567?v=4',
      });

      return (
        <div
          style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    isMobile: true,
  },
};

export const WithoutPicture: Story = {
  args: {
    isMobile: false,
  },
  decorators: [
    (Story) => {
      authStore.setAuthenticated(true);
      authStore.setUser({
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        user_name: 'janey',
      });

      return (
        <div
          style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export const Loading: Story = {
  args: {
    isMobile: false,
  },
  decorators: [
    (Story) => {
      authStore.setAuthenticated(false);
      authStore.setUser(null);
      // Simulate loading state
      authStore.isLoading = true;

      return (
        <div
          style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};
