import ReactDOM from 'react-dom/client';
import { UserProfileDropdown } from './components/user-profile-dropdown';
import { authStore } from './stores';
import './index.css';

// Mock user data for development - only in dev mode
if (process.env.NODE_ENV === 'development') {
  authStore.setAuthenticated(true);
  authStore.setUser({
    user_name: 'John Doe',
    email: 'john.doe@example.com',
    name: 'John Doe',
    picture: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  });
}

function App() {
  return (
    <div className="min-h-screen bg-adu-muted p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-adu-foreground">
          Auth0 Docs UI Development
        </h1>

        <div className="space-y-8">
          <div className="bg-adu-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 text-adu-card-foreground">
              User Profile Dropdown - Desktop
            </h2>
            <div className="flex justify-end">
              <UserProfileDropdown />
            </div>
          </div>

          <div className="bg-adu-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 text-adu-card-foreground">
              User Profile Dropdown - Mobile
            </h2>
            <div className="flex justify-start">
              <UserProfileDropdown isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
