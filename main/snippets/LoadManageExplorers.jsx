import { useEffect } from 'react';
import { manageExplorers } from '/scripts/manage-explorers.js';

export default function LoadManageExplorers() {
  useEffect(() => {
    // Execute the manage-explorers script
    manageExplorers();
  }, []);

  return null; // This component doesn't render anything
}
