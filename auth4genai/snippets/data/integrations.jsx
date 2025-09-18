export const integrationTypes = ["Social", "Enterprise"];

export const integrations = [
  {
    id: "gmail",
    title: "Gmail",
    icon: "/ai/docs/img/integrations/gmail-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and send Gmail emails.",
  },
  {
    id: "google-calendar",
    title: "Google Calendar",
    icon: "/ai/docs/img/integrations/google-calendar-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, schedule, and update events in Google Calendar.",
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/ai/docs/img/integrations/google-drive-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify files in Google Drive.",
  },
  {
    id: "google-sheets",
    title: "Google Sheets",
    icon: "/ai/docs/img/integrations/google-sheets-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify spreadsheets in Google Sheets.",
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/ai/docs/img/integrations/google-slides-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify slides in Google Slides.",
  },
  {
    id: "google-contacts",
    title: "Google Contacts",
    icon: "/ai/docs/img/integrations/google-contacts-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify contacts in Google Contacts.",
  },
  {
    id: "google-tasks",
    title: "Google Tasks",
    icon: "/ai/docs/img/integrations/google-tasks-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify tasks in Google Tasks.",
  },
  {
    id: "google-workspace",
    title: "Google Workspace",
    icon: "/ai/docs/img/integrations/google-avatar.png",
    href: "/integrations/google-workspace",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI Agents to access your Google Workspace services including Gmail, Google Calendar, Drive, and more.",
  },
  {
    id: "youtube",
    title: "Youtube",
    icon: "/ai/docs/img/integrations/youtube-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and manage YouTube videos.",
  },
  {
    id: "microsoft",
    title: "Microsoft",
    icon: "/ai/docs/img/integrations/microsoft-avatar.png",
    href: "/integrations/microsoft",
    status: "Available",
    type: "Social",
    description: "Connect to your users via their Microsoft Account.",
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Azure AD",
    icon: "/ai/docs/img/integrations/microsoft-avatar.png",
    href: "/integrations/microsoft-azure",
    status: "Available",
    type: "Enterprise",
    description: "Connect to your users via their Microsoft Azure Account.",
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/ai/docs/img/integrations/github-avatar.png",
    href: "/integrations/github",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to create and manage GitHub issues and pull requests.",
    styles: {
      filter: "var(--github-logo-filter, none)",
    },
  },
  {
    id: "slack",
    title: "Sign in with Slack",
    icon: "/ai/docs/img/integrations/slack-avatar.png",
    href: "/integrations/slack",
    status: "Available",
    type: "Social",
    description: "Allow your AI Agents to send and receive Slack messages.",
  },
  {
    id: "box",
    title: "Box",
    icon: "/ai/docs/img/integrations/box-avatar.png",
    href: "/integrations/box",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agents to search, create, and modify files in Box.",
  },
  {
    id: "oauth2",
    title: "OAuth2",
    icon: "/ai/docs/img/integrations/oauth2-avatar.png",
    href: "/integrations/oauth2",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to connect with any OAuth2 compliant identity provider or service.",
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    icon: "/ai/docs/img/integrations/oidc-avatar.png",
    href: "/integrations/oidc",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI Agent to connect with any OpenID Connect (OIDC) compliant identity provider.",
  },
  {
    id: "discord",
    title: "Discord",
    icon: "/ai/docs/img/integrations/discord-avatar.png",
    href: "/integrations/discord",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to welcome new members, play music, manage user roles, and integrate with other services to post notifications.",
  },
  {
    id: "figma",
    title: "Figma",
    icon: "/ai/docs/img/integrations/figma-avatar.png",
    href: "/integrations/figma",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to export assets, apply changes to design files programmatically, and comment on prototypes to automate design feedback loops.",
  },
  {
    id: "freshbooks",
    title: "FreshBooks",
    icon: "/ai/docs/img/integrations/fresh-books-avatar.png",
    href: "/integrations/freshbooks",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to create and send invoices, track expenses from receipts, and manage client information.",
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: "/ai/docs/img/integrations/snapchat-avatar.png",
    href: "/integrations/snapchat",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to share content (photos, videos, links) directly to a user's Snapchat account.",
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/ai/docs/img/integrations/spotify-avatar.png",
    href: "/integrations/spotify",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to discover music, create and modify playlists based on user taste, control playback on devices, and add songs to the user's library.",
  },
  {
    id: "stripe",
    title: "Stripe",
    icon: "/ai/docs/img/integrations/stripe-avatar.png",
    href: "/integrations/stripe",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to act as a platform finance agent that can onboard new sellers, facilitate payments between customers and sellers, manage payouts, and handle marketplace financial operations.",
  },
  {
    id: "tumblr",
    title: "Tumblr",
    icon: "/ai/docs/img/integrations/tumblr-avatar.png",
    href: "/integrations/tumblr",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent to create and schedule new posts (text, photo, video), reblog content, and manage a user's blog theme and settings.",
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: "/ai/docs/img/integrations/amazon-avatar.png",
    href: "/integrations/amazon",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as an Amazon seller to manage inventory, update product listings, and track sales performance. Or, as a consumer, a shopping agent that tracks product prices and availability.",
  },
  {
    id: "bitbucket",
    title: "Bitbucket",
    icon: "/ai/docs/img/integrations/bitbucket-avatar.png",
    href: "/integrations/bitbucket",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as a Bitbucket user to manage repositories, track issues, and automate work with code repositories.",
  },
  {
    id: "dropbox",
    title: "Dropbox",
    icon: "/ai/docs/img/integrations/dropbox-avatar.png",
    href: "/integrations/dropbox",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as a Dropbox user to manage files, share Dropbox content for analysis, and automate document processing.",
  },
  {
    id: "fitbit",
    title: "Fitbit",
    icon: "/ai/docs/img/integrations/fitbit-avatar.png",
    href: "/integrations/fitbit",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as a Fitbit user to access health data, track fitness goals, and manage user profiles.",
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "/ai/docs/img/integrations/hugging-face-avatar.png",
    href: "/integrations/hugging-face",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as a Hugging Face user to access model information, manage datasets, and integrate with machine learning workflows.",
  },
  {
    id: "paypal",
    title: "Paypal",
    icon: "/ai/docs/img/integrations/paypal-avatar.png",
    href: "/integrations/paypal",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI Agent as a Paypal user to access transaction information, manage payments, and integrate with financial workflows.",
  },
];
