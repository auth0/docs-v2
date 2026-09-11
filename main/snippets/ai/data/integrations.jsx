export const integrationTypes = ["Social", "Enterprise"];

export const integrations = [
  {
    id: "gmail",
    title: "Gmail",
    icon: "/docs/images/ai/connections/gmail-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and send Gmail emails.",
  },
  {
    id: "google-calendar",
    title: "Google Calendar",
    icon: "/docs/images/ai/connections/google-calendar-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, schedule, and update events in Google Calendar.",
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/docs/images/ai/connections/google-drive-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify files in Google Drive.",
  },
  {
    id: "google-sheets",
    title: "Google Sheets",
    icon: "/docs/images/ai/connections/google-sheets-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify spreadsheets in Google Sheets.",
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/docs/images/ai/connections/google-slides-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify slides in Google Slides.",
  },
  {
    id: "google-contacts",
    title: "Google Contacts",
    icon: "/docs/images/ai/connections/google-contacts-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify contacts in Google Contacts.",
  },
  {
    id: "google-tasks",
    title: "Google Tasks",
    icon: "/docs/images/ai/connections/google-tasks-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify tasks in Google Tasks.",
  },
  {
    id: "google-workspace",
    title: "Google Workspace",
    icon: "/docs/images/ai/connections/google-avatar.png",
    href: "/ai/docs/connections/google-workspace",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI agents to access your Google Workspace services including Gmail, Google Calendar, Drive, and more.",
  },
  {
    id: "youtube",
    title: "YouTube",
    icon: "/docs/images/ai/connections/youtube-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and manage YouTube videos.",
  },
  {
    id: "microsoft",
    title: "Microsoft",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft",
    status: "Available",
    type: "Social",
    description: "Connect to your users via their Microsoft Account.",
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Entra (Azure AD)",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft-azure",
    status: "Available",
    type: "Enterprise",
    description: "Allow your AI agents to connect to Microsoft Entra (Azure AD) services including Outlook, Teams, OneDrive, and more.",
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/docs/images/ai/connections/github-avatar.png",
    href: "/ai/docs/connections/github",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to create and manage GitHub issues and pull requests.",
    styles: {
      filter: "var(--github-logo-filter, none)",
    },
  },
  {
    id: "slack",
    title: "Sign in with Slack",
    icon: "/docs/images/ai/connections/slack-avatar.png",
    href: "/ai/docs/connections/slack",
    status: "Available",
    type: "Social",
    description: "Allow your AI agents to send and receive Slack messages.",
  },
  {
    id: "box",
    title: "Box",
    icon: "/docs/images/ai/connections/box-avatar.png",
    href: "/ai/docs/connections/box",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify files in Box.",
  },
  {
    id: "oauth2",
    title: "OAuth2",
    icon: "/docs/images/ai/connections/oauth2-avatar.png",
    href: "/ai/docs/connections/oauth2",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to connect with any OAuth2 compliant identity provider or service.",
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    icon: "/docs/images/ai/connections/oidc-avatar.png",
    href: "/ai/docs/connections/oidc",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI agent to connect with any OpenID Connect (OIDC) compliant identity provider.",
  },
  {
    id: "discord",
    title: "Discord",
    icon: "/docs/images/ai/connections/discord-avatar.png",
    href: "/ai/docs/connections/discord",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to welcome new members, play music, manage user roles, and integrate with other services to post notifications.",
  },
  {
    id: "figma",
    title: "Figma",
    icon: "/docs/images/ai/connections/figma-avatar.png",
    href: "/ai/docs/connections/figma",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to export assets, apply changes to design files programmatically, and comment on prototypes to automate design feedback loops.",
  },
  {
    id: "freshbooks",
    title: "FreshBooks",
    icon: "/docs/images/ai/connections/fresh-books-avatar.png",
    href: "/ai/docs/connections/freshbooks",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to create and send invoices, track expenses from receipts, and manage client information.",
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: "/docs/images/ai/connections/snapchat-avatar.png",
    href: "/ai/docs/connections/snapchat",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to share content (photos, videos, links) directly to a user's Snapchat account.",
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/docs/images/ai/connections/spotify-avatar.png",
    href: "/ai/docs/connections/spotify",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to discover music, create and modify playlists based on user taste, control playback on devices, and add songs to the user's library.",
  },
  {
    id: "stripe",
    title: "Stripe Connect",
    icon: "/docs/images/ai/connections/stripe-avatar.png",
    href: "/ai/docs/connections/stripe-connect",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to act as a platform finance agent that can onboard new sellers, facilitate payments between customers and sellers, manage payouts, and handle marketplace financial operations.",
  },
  {
    id: "tumblr",
    title: "Tumblr",
    icon: "/docs/images/ai/connections/tumblr-avatar.png",
    href: "/ai/docs/connections/tumblr",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to create and schedule new posts (text, photo, video), reblog content, and manage a user's blog theme and settings.",
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: "/docs/images/ai/connections/amazon-avatar.png",
    href: "/ai/docs/connections/amazon",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent as an Amazon seller to manage inventory, update product listings, and track sales performance. Or, as a consumer, a shopping agent that tracks product prices and availability.",
  },
  {
    id: "basecamp",
    title: "Basecamp",
    icon: "/docs/images/ai/connections/basecamp-avatar.png",
    href: "/ai/docs/connections/basecamp",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage projects, to-do lists, messages, schedules, and team collaboration in Basecamp.",
  },
  {
    id: "digitalocean",
    title: "DigitalOcean",
    icon: "/docs/images/ai/connections/digitalocean-avatar.png",
    href: "/ai/docs/connections/digitalocean",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to provision and manage cloud infrastructure, Droplets, Kubernetes clusters, and automate deployment workflows.",
  },
  {
    id: "salesforce",
    title: "Salesforce",
    icon: "/docs/images/ai/connections/salesforce-avatar.png",
    href: "/ai/docs/connections/salesforce",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access customer records, manage sales opportunities, and automate CRM workflows in Salesforce.",
  },
  {
    id: "twitch",
    title: "Twitch",
    icon: "/docs/images/ai/connections/twitch-avatar.png",
    href: "/ai/docs/connections/twitch",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Twitch streaming data, manage broadcasts, and integrate with gaming workflows.",
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    icon: "/docs/images/ai/connections/x-avatar.png",
    href: "/ai/docs/connections/twitter",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to post tweets, manage followers, and integrate with social media workflows.",
  },
  {
   
    id: "bitbucket",
    title: "Bitbucket",
    icon: "/docs/images/ai/connections/bitbucket-avatar.png",
    href: "/ai/docs/connections/bitbucket",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage Bitbucket repositories, track issues, and automate work with code repositories.",
  },
  {
    id: "dropbox",
    title: "Dropbox",
    icon: "/docs/images/ai/connections/dropbox-avatar.png",
    href: "/ai/docs/connections/dropbox",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage files, share Dropbox content for analysis, and automate document processing.",
  },
  {
    id: "fitbit",
    title: "Fitbit",
    icon: "/docs/images/ai/connections/fitbit-avatar.png",
    href: "/ai/docs/connections/fitbit",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Fitbit health data, track fitness goals, and manage user profiles.",
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "/docs/images/ai/connections/hugging-face-avatar.png",
    href: "/ai/docs/connections/hugging-face",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Hugging Face model information, manage datasets, and integrate with machine learning workflows.",
  },
  {
    id: "paypal",
    title: "PayPal",
    icon: "/docs/images/ai/connections/paypal-avatar.png",
    href: "/ai/docs/connections/paypal",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access PayPal transaction information, manage payments, and integrate with financial workflows.",
  },
];
