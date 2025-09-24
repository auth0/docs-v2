import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Button, FlagIcon, SvgIcon } from './components';

function main() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div className="flex flex-col items-start gap-4 p-4">
        <Button>Test Button</Button>
        <div className="flex gap-2">
          <SvgIcon iconName="check" />
          <FlagIcon country="australia" />
          <FlagIcon country="canada" />
          <FlagIcon country="india" />
          <FlagIcon country="japan" />
          <FlagIcon country="uk" />
          <FlagIcon country="us" />
        </div>
      </div>
    </StrictMode>,
  );
}

main();
