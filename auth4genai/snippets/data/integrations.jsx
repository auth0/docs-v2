export const integrationTypes = ["Social", "Enterprise"];

export const integrations = [
  {
    id: "gmail",
    title: "Gmail",
    icon: "/img/integrations/gmail-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and send Gmail emails.",
  },
  {
    id: "google-calendar",
    title: "Google Calendar",
    icon: "/img/integrations/google-calendar-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, schedule, and update events in Google Calendar.",
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/img/integrations/google-drive-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify files in Google Drive.",
  },
  {
    id: "google-sheets",
    title: "Google Sheets",
    icon: "/img/integrations/google-sheets-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify spreadsheets in Google Sheets.",
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/img/integrations/google-slides-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify slides in Google Slides.",
  },
  {
    id: "google-contacts",
    title: "Google Contacts",
    icon: "/img/integrations/google-contacts-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify contacts in Google Contacts.",
  },
  {
    id: "google-tasks",
    title: "Google Tasks",
    icon: "/img/integrations/google-tasks-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify tasks in Google Tasks.",
  },
  {
    id: "google-workspace",
    title: "Google Workspace",
    icon: "/img/integrations/google-avatar.png",
    href: "/integrations/google-workspace",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI agents to access your Google Workspace services including Gmail, Google Calendar, Drive, and more.",
  },
  {
    id: "youtube",
    title: "YouTube",
    icon: "/img/integrations/youtube-avatar.png",
    href: "/integrations/google",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and manage YouTube videos.",
  },
  {
    id: "microsoft",
    title: "Microsoft",
    icon: "/img/integrations/microsoft-avatar.png",
    href: "/integrations/microsoft",
    status: "Available",
    type: "Social",
    description: "Connect to your users via their Microsoft Account.",
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Entra (Azure AD)",
    icon: "/img/integrations/microsoft-avatar.png",
    href: "/integrations/microsoft-azure",
    status: "Available",
    type: "Enterprise",
    description: "Allow your AI agents to connect to Microsoft Entra (Azure AD) services including Outlook, Teams, OneDrive, and more.",
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/img/integrations/github-avatar.png",
    href: "/integrations/github",
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
    icon: "/img/integrations/slack-avatar.png",
    href: "/integrations/slack",
    status: "Available",
    type: "Social",
    description: "Allow your AI agents to send and receive Slack messages.",
  },
  {
    id: "box",
    title: "Box",
    icon: "/img/integrations/box-avatar.png",
    href: "/integrations/box",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agents to search, create, and modify files in Box.",
  },
  {
    id: "oauth2",
    title: "OAuth2",
    icon: "/img/integrations/oauth2-avatar.png",
    href: "/integrations/oauth2",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to connect with any OAuth2 compliant identity provider or service.",
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    icon: "/img/integrations/oidc-avatar.png",
    href: "/integrations/oidc",
    status: "Available",
    type: "Enterprise",
    description:
      "Allow your AI agent to connect with any OpenID Connect (OIDC) compliant identity provider.",
  },
  {
    id: "discord",
    title: "Discord",
    icon: "/img/integrations/discord-avatar.png",
    href: "/integrations/discord",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to welcome new members, play music, manage user roles, and integrate with other services to post notifications.",
  },
  {
    id: "figma",
    title: "Figma",
    icon: "/img/integrations/figma-avatar.png",
    href: "/integrations/figma",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to export assets, apply changes to design files programmatically, and comment on prototypes to automate design feedback loops.",
  },
  {
    id: "freshbooks",
    title: "FreshBooks",
    icon: "/img/integrations/fresh-books-avatar.png",
    href: "/integrations/freshbooks",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to create and send invoices, track expenses from receipts, and manage client information.",
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: "/img/integrations/snapchat-avatar.png",
    href: "/integrations/snapchat",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to share content (photos, videos, links) directly to a user's Snapchat account.",
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/img/integrations/spotify-avatar.png",
    href: "/integrations/spotify",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to discover music, create and modify playlists based on user taste, control playback on devices, and add songs to the user's library.",
  },
  {
    id: "stripe",
    title: "Stripe Connect",
    icon: "/img/integrations/stripe-avatar.png",
    href: "/integrations/stripe-connect",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to act as a platform finance agent that can onboard new sellers, facilitate payments between customers and sellers, manage payouts, and handle marketplace financial operations.",
  },
  {
    id: "tumblr",
    title: "Tumblr",
    icon: "/img/integrations/tumblr-avatar.png",
    href: "/integrations/tumblr",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to create and schedule new posts (text, photo, video), reblog content, and manage a user's blog theme and settings.",
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: "/img/integrations/amazon-avatar.png",
    href: "/integrations/amazon",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent as an Amazon seller to manage inventory, update product listings, and track sales performance. Or, as a consumer, a shopping agent that tracks product prices and availability.",
  },
  {
    id: "basecamp",
    title: "Basecamp",
    icon: "/img/integrations/basecamp-avatar.png",
    href: "/integrations/basecamp",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage projects, to-do lists, messages, schedules, and team collaboration in Basecamp.",
  },
  {
    id: "digitalocean",
    title: "DigitalOcean",
    icon: "/img/integrations/digitalocean-avatar.png",
    href: "/integrations/digitalocean",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to provision and manage cloud infrastructure, Droplets, Kubernetes clusters, and automate deployment workflows.",
  },
  {
    id: "salesforce",
    title: "Salesforce",
    icon: "/img/integrations/salesforce-avatar.png",
    href: "/integrations/salesforce",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access customer records, manage sales opportunities, and automate CRM workflows in Salesforce.",
  },
  {
    id: "twitch",
    title: "Twitch",
    icon: "/img/integrations/twitch-avatar.png",
    href: "/integrations/twitch",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Twitch streaming data, manage broadcasts, and integrate with gaming workflows.",
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    icon: "/img/integrations/x-avatar.png",
    href: "/integrations/twitter",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to post tweets, manage followers, and integrate with social media workflows.",
  },
  {

    id: "bitbucket",
    title: "Bitbucket",
    icon: "/img/integrations/bitbucket-avatar.png",
    href: "/integrations/bitbucket",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage Bitbucket repositories, track issues, and automate work with code repositories.",
  },
  {
    id: "dropbox",
    title: "Dropbox",
    icon: "/img/integrations/dropbox-avatar.png",
    href: "/integrations/dropbox",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to manage files, share Dropbox content for analysis, and automate document processing.",
  },
  {
    id: "fitbit",
    title: "Fitbit",
    icon: "/img/integrations/fitbit-avatar.png",
    href: "/integrations/fitbit",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Fitbit health data, track fitness goals, and manage user profiles.",
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "/img/integrations/hugging-face-avatar.png",
    href: "/integrations/hugging-face",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access Hugging Face model information, manage datasets, and integrate with machine learning workflows.",
  },
  {
    id: "paypal",
    title: "PayPal",
    icon: "/img/integrations/paypal-avatar.png",
    href: "/integrations/paypal",
    status: "Available",
    type: "Social",
    description:
      "Allow your AI agent to access PayPal transaction information, manage payments, and integrate with financial workflows.",
  },
];
