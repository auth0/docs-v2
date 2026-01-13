import { postFeedback } from './api';

/**
 * Feedback listeners for Mintlify documentation pages
 *
 * This module sets up event listeners to capture user feedback from:
 * 1. Page-level feedback forms (at the bottom of each documentation page)
 * 2. Code snippet feedback forms (associated with code blocks)
 *
 * The implementation uses event delegation on the document body to handle
 * dynamically rendered Mintlify components.
 */

type FeedbackMode = 'POSITIVE' | 'NEGATIVE';

/**
 * Determines the tracking code based on the current page URL
 */
function getTrackingCode(): string {
  const path = window.location.pathname;

  if (path.startsWith('/docs/api/management')) {
    return 'docs:management-api';
  }

  if (path.startsWith('/docs/api/authentication')) {
    return 'docs:auth-api';
  }

  if (path.startsWith('/docs/quickstarts')) {
    return 'quickstarts:code-snippet';
  }

  return '';
}

/**
 * Determines the feedback mode (POSITIVE or NEGATIVE) for page-level feedback
 * by checking which button has the "border" class.
 *
 * IMPORTANT: This is fragile code that relies on Mintlify's current HTML structure.
 * TODO: Request Mintlify to add unique identifiers to these buttons.
 */
function getFeedbackMode(): FeedbackMode {
  // Query select all buttons inside the feedback-toolbar but not inside contextual-feedback-container
  const toolbar = document.querySelector('.feedback-toolbar');
  if (!toolbar) return 'NEGATIVE'; // Default to negative if we can't determine

  const feedbackContainer = toolbar.querySelector(
    '.contextual-feedback-container',
  );
  const buttons = Array.from(toolbar.querySelectorAll('button')).filter(
    (button) => !feedbackContainer?.contains(button),
  );

  // The first button is for positive feedback, the second is for negative
  // Check which one has the "border" class (indicates it was clicked)
  if (buttons.length >= 2) {
    const firstButton = buttons[0];
    const secondButton = buttons[1];

    if (firstButton.classList.contains('border')) {
      return 'POSITIVE';
    }

    if (secondButton.classList.contains('border')) {
      return 'NEGATIVE';
    }
  }

  // Default to NEGATIVE if we can't determine
  return 'NEGATIVE';
}

/**
 * Tracks feedback events in Heap Analytics
 */
function trackFeedback(
  feedbackMode: FeedbackMode,
  message: string,
  eventComponent: string,
) {
  if (!window.heap) {
    console.warn('Heap analytics not available');
    return;
  }

  const trackingCode = getTrackingCode();

  // Track the comment submission
  window.heap.track('submit:auth0-docs:feedback-comment', {
    value: feedbackMode,
    comment: message,
    component: eventComponent,
    dwh: {
      event: `submit:${trackingCode}:feedback-message`,
      properties: {
        trackData: message,
        track_data2: feedbackMode,
        track_data3: eventComponent,
      },
    },
  });
}

/**
 * Tracks boolean feedback (thumbs up/down) in Heap Analytics
 */
function trackBooleanFeedback(feedbackMode: FeedbackMode) {
  if (!window.heap) {
    console.warn('Heap analytics not available');
    return;
  }

  const trackingCode = getTrackingCode();
  // TODO: Handle ApiExplorerFooter component tracking later
  const eventComponent = '';

  window.heap.track('click:auth0-docs:feedback-boolean', {
    value: feedbackMode,
    component: eventComponent,
    dwh: {
      event: `submit:${trackingCode}:feedback-helpful`,
      properties: {
        trackData: feedbackMode === 'POSITIVE',
        track_data2: eventComponent,
      },
    },
  });
}

/**
 * Handles page-level feedback form submission
 */
async function handlePageFeedbackSubmit(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const input = form.querySelector('#feedback-form-input') as
    | HTMLInputElement
    | HTMLTextAreaElement;

  if (!input || !input.value.trim()) {
    return;
  }

  const feedbackMode = getFeedbackMode();
  const message = input.value.trim();

  // Track in analytics
  trackFeedback(feedbackMode, message, 'FeedbackSection');
  trackBooleanFeedback(feedbackMode);

  // Submit to API
  try {
    await postFeedback({
      positive: feedbackMode === 'POSITIVE',
      page_url: window.location.href,
      page_title: document.title,
      comment: message,
    });
    console.log('Feedback submitted successfully');
    // Optionally show success message to user
  } catch (error) {
    console.error('Failed to submit feedback:', error);
  }
}

/**
 * Handles code snippet feedback form submission
 */
async function handleCodeSnippetFeedbackClick(event: Event) {
  const button = event.target as HTMLElement;

  // Find the closest feedback form container
  const feedbackForm = button.closest('.code-snippet-feedback-form');
  if (!feedbackForm) return;

  const textarea = feedbackForm.querySelector(
    '#code-snippet-feedback-textarea',
  ) as HTMLTextAreaElement;

  if (!textarea || !textarea.value.trim()) {
    return;
  }

  const message = textarea.value.trim();
  const feedbackMode: FeedbackMode = 'NEGATIVE'; // Code snippet feedback is always negative

  // Track in analytics
  trackFeedback(feedbackMode, message, 'FeedbackSection');

  // Submit to API
  try {
    await postFeedback({
      positive: false,
      page_url: window.location.href,
      page_title: document.title,
      comment: message,
    });
    console.log('Code snippet feedback submitted successfully');
    // Optionally show success message to user
  } catch (error) {
    console.error('Failed to submit code snippet feedback:', error);
  }
}

/**
 * Initializes feedback event listeners using event delegation
 */
export function initFeedbackListeners() {
  // Listener for page-level feedback form submission
  document.body.addEventListener('submit', (event) => {
    const form = event.target as HTMLElement;
    if (
      form &&
      (form.id === 'feedback-form' ||
        form.classList.contains('contextual-feedback-form'))
    ) {
      handlePageFeedbackSubmit(event);
    }
  });

  // Listener for code snippet feedback button clicks
  document.body.addEventListener('click', (event) => {
    const button = event.target as HTMLElement;
    if (
      button &&
      button.classList.contains('code-snippet-feedback-form-submit-button')
    ) {
      handleCodeSnippetFeedbackClick(event);
    }
  });

  console.log('Feedback listeners initialized');
}
