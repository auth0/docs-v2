export const integrationTypes = ['Social', 'Enterprise', 'Custom'];

export const integrations = [
    {
      id: "gmail",
      title: "Gmail",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Email platform integration for accessing inbox, sending messages, and managing communications.",
    },
    {
      id: "google-calendar",
      title: "Google Calendar",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Calendar integration for scheduling events, reminders, and managing appointments.",
    },
     {
      id: "google-drive",
      title: "Google Drive",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Cloud storage integration for accessing, sharing, and managing files and documents.",
    },
     {
      id: "google-sheets",
      title: "Google Sheets",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Spreadsheet platform integration for analyzing, updating, and automating data.",
    },
     {
      id: "google-slides",
      title: "Google Slides",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Presentation platform integration for creating, viewing, and collaborating on slides.",
    },
     {
      id: "google-contacts",
      title: "Google Contacts",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Contact management integration for syncing and accessing address book data.",
    },
     {
      id: "google-tasks",
      title: "Google Tasks",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Task management integration for tracking, updating, and automating to-do lists.",
    },
     {
      id: "youtube",
      title: "Youtube",
      icon: "/img/integrations/google-avatar.png",
      href: "/integrations/google",
      status: "Available",
      type: "Social",
      description:
        "Video platform integration for accessing channel data, content, and analytics.",
    },
    {
      id: "microsoft",
      title: "Microsoft",
      icon: "/img/integrations/microsoft-avatar.png",
      href: "/integrations/microsoft",
      status: "Available",
      type: "Enterprise",
      description:
        "Microsoft 365 and Azure AD integration for enterprise-grade authentication and Office apps.",
    },
    {
      id: "github",
      title: "GitHub",
      icon: "/img/integrations/github-avatar.png",
      href: "/integrations/github",
      status: "Available",
      type: "Social",
      description:
        "Developer platform connection with access to repositories, issues, and code management.",
      styles: {
        filter: "var(--github-logo-filter, none)",
      }
    },
    {
      id: "slack",
      title: "Slack",
      icon: "/img/integrations/slack-avatar.png",
      href: "/integrations/slack",
      status: "Available",
      type: "Enterprise",
      description:
        "Team communication platform for channel management, messaging, and workspace integration.",
    },
    {
      id: "box",
      title: "Box",
      icon: "/img/integrations/box-avatar.png",
      href: "/integrations/box",
      status: "Available",
      type: "Enterprise",
      description:
        "Cloud storage and collaboration platform for file management and document sharing.",
    },
    {
      id: "custom",
      title: "Custom OAuth2",
      icon: "", // TODO
      href: "/integrations/custom",
      status: "Available",
      type: "Custom",
      description:
        "OAuth2 integration for connecting any standards-compliant identity provider or service.",
    },
        {
      id: "oidc",
      title: "OpenID Connect",
      icon: "", // TODO
      href: "/integrations/oidc",
      status: "Available",
      type: "Custom",
      description:
        "OpenID Connect (OIDC) integration for secure authentication and user identity management.",
    },
  ];