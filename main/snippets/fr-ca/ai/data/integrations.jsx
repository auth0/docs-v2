export const integrationTypes = ["Social", "Entreprise"];

export const integrations = [
  {
    id: "gmail",
    title: "Gmail",
    icon: "/docs/images/ai/connections/gmail-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et envoyer des courriels Gmail."
  },
  {
    id: "google-calendar",
    title: "Google Calendar",
    icon: "/docs/images/ai/connections/google-calendar-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, planifier et mettre à jour des événements dans Google Calendar."
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/docs/images/ai/connections/google-drive-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des fichiers dans Google Drive."
  },
  {
    id: "google-sheets",
    title: "Google Sheets",
    icon: "/docs/images/ai/connections/google-sheets-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des feuilles de calcul dans Google Sheets."
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/docs/images/ai/connections/google-slides-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des diapositives dans Google Slides."
  },
  {
    id: "google-contacts",
    title: "Google Contacts",
    icon: "/docs/images/ai/connections/google-contacts-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des contacts dans Google Contacts."
  },
  {
    id: "google-tasks",
    title: "Google Tasks",
    icon: "/docs/images/ai/connections/google-tasks-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des tâches dans Google Tasks."
  },
  {
    id: "google-workspace",
    title: "Google Workspace",
    icon: "/docs/images/ai/connections/google-avatar.png",
    href: "/ai/docs/connections/google-workspace",
    status: "Disponible",
    type: "Entreprise",
    description: "Permet à vos agents d’IA d’accéder à vos services Google Workspace, notamment Gmail, Google Calendar, Drive et plus encore."
  },
  {
    id: "youtube",
    title: "YouTube",
    icon: "/docs/images/ai/connections/youtube-avatar.png",
    href: "/ai/docs/connections/google",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et gérer des vidéos YouTube."
  },
  {
    id: "microsoft",
    title: "Microsoft",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Connectez-vous à vos utilisateurs par l’intermédiaire de leur compte Microsoft."
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Entra (Azure AD)",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft-azure",
    status: "Disponible",
    type: "Entreprise",
    description: "Permet à vos agents d’IA de se connecter aux services Microsoft Entra (Azure AD), notamment Outlook, Teams, OneDrive et plus encore."
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/docs/images/ai/connections/github-avatar.png",
    href: "/ai/docs/connections/github",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de créer et de gérer des issues et des demandes de tirage GitHub.",
    styles: {
      filter: "var(--github-logo-filter, none)"
    }
  },
  {
    id: "slack",
    title: "Connexion avec Slack",
    icon: "/docs/images/ai/connections/slack-avatar.png",
    href: "/ai/docs/connections/slack",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA d’envoyer et de recevoir des messages Slack."
  },
  {
    id: "box",
    title: "Box",
    icon: "/docs/images/ai/connections/box-avatar.png",
    href: "/ai/docs/connections/box",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à vos agents d’IA de rechercher, créer et modifier des fichiers dans Box."
  },
  {
    id: "oauth2",
    title: "OAuth2",
    icon: "/docs/images/ai/connections/oauth2-avatar.png",
    href: "/ai/docs/connections/oauth2",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA de se connecter à tout fournisseur d’identité ou service conforme à OAuth2."
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    icon: "/docs/images/ai/connections/oidc-avatar.png",
    href: "/ai/docs/connections/oidc",
    status: "Disponible",
    type: "Entreprise",
    description: "Permet à votre agent d’IA de se connecter à tout fournisseur d’identité conforme à OpenID Connect (OIDC)."
  },
  {
    id: "discord",
    title: "Discord",
    icon: "/docs/images/ai/connections/discord-avatar.png",
    href: "/ai/docs/connections/discord",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA d’accueillir de nouveaux membres, de jouer de la musique, de gérer les rôles des utilisateurs et de s’intégrer à d’autres services pour envoyer des notifications."
  },
  {
    id: "figma",
    title: "Figma",
    icon: "/docs/images/ai/connections/figma-avatar.png",
    href: "/ai/docs/connections/figma",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA d’exporter des ressources, d’apporter des modifications aux fichiers de conception par programmation et de commenter des prototypes afin d’automatiser les cycles de rétroaction sur la conception."
  },
  {
    id: "freshbooks",
    title: "FreshBooks",
    icon: "/docs/images/ai/connections/fresh-books-avatar.png",
    href: "/ai/docs/connections/freshbooks",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA de créer et d’envoyer des factures, de suivre les dépenses à partir de reçus et de gérer les renseignements sur les clients."
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: "/docs/images/ai/connections/snapchat-avatar.png",
    href: "/ai/docs/connections/snapchat",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA de partager du contenu (photos, vidéos, liens) directement vers le compte Snapchat d’un utilisateur."
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/docs/images/ai/connections/spotify-avatar.png",
    href: "/ai/docs/connections/spotify",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permet à votre agent d’IA de découvrir de la musique, de créer et de modifier des listes de lecture selon les goûts de l’utilisateur, de contrôler la lecture sur les appareils et d’ajouter des chansons à la bibliothèque de l’utilisateur."
  },
  {
    id: "stripe",
    title: "Stripe Connect",
    icon: "/docs/images/ai/connections/stripe-avatar.png",
    href: "/ai/docs/connections/stripe-connect",
    status: "Disponible",
    type: "Réseaux sociaux",
    description:
      "Permet à votre agent d’IA d’agir comme agent financier de plateforme pouvant intégrer de nouveaux vendeurs, faciliter les paiements entre clients et vendeurs, gérer les versements et traiter les opérations financières de la place de marché."
  },
  {
    id: "tumblr",
    title: "Tumblr",
    icon: "/docs/images/ai/connections/tumblr-avatar.png",
    href: "/ai/docs/connections/tumblr",
    status: "Disponible",
    type: "Réseaux sociaux",
    description: "Permettez à votre agent d'IA de créer et de planifier de nouvelles publications (texte, photo, vidéo), de rebloguer du contenu et de gérer le thème et les paramètres du blogue d'un utilisateur."
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: "/docs/images/ai/connections/amazon-avatar.png",
    href: "/ai/docs/connections/amazon",
    status: "Available",
    type: "Social",
    description:
      "Permettez à votre agent d'IA, en tant que vendeur Amazon, de gérer l'inventaire, de mettre à jour les fiches de produits et de suivre le rendement des ventes. Ou encore, du côté du consommateur, d'agir comme agent magasineur qui surveille les prix et la disponibilité des produits."
  },
  {
    id: "basecamp",
    title: "Basecamp",
    icon: "/docs/images/ai/connections/basecamp-avatar.png",
    href: "/ai/docs/connections/basecamp",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA de gérer les projets, les listes de tâches, les messages, les horaires et la collaboration d'équipe dans Basecamp."
  },
  {
    id: "digitalocean",
    title: "DigitalOcean",
    icon: "/docs/images/ai/connections/digitalocean-avatar.png",
    href: "/ai/docs/connections/digitalocean",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA de provisionner et de gérer l'infrastructure infonuagique, les Droplets et les grappes Kubernetes, et d'automatiser les flux de production de déploiement."
  },
  {
    id: "salesforce",
    title: "Salesforce",
    icon: "/docs/images/ai/connections/salesforce-avatar.png",
    href: "/ai/docs/connections/salesforce",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA d'accéder aux dossiers clients, de gérer les occasions de vente et d'automatiser les flux de production de GRC dans Salesforce."
  },
  {
    id: "twitch",
    title: "Twitch",
    icon: "/docs/images/ai/connections/twitch-avatar.png",
    href: "/ai/docs/connections/twitch",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA d'accéder aux données de diffusion en continu de Twitch, de gérer les diffusions et de s'intégrer aux flux de production de jeu vidéo."
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    icon: "/docs/images/ai/connections/x-avatar.png",
    href: "/ai/docs/connections/twitter",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA de publier des gazouillis, de gérer les abonnés et de s'intégrer aux flux de production des médias sociaux."
  },
  {
    id: "bitbucket",
    title: "Bitbucket",
    icon: "/docs/images/ai/connections/bitbucket-avatar.png",
    href: "/ai/docs/connections/bitbucket",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA de gérer les dépôts Bitbucket, de suivre les tickets et d'automatiser le travail avec les dépôts de code."
  },
  {
    id: "dropbox",
    title: "Dropbox",
    icon: "/docs/images/ai/connections/dropbox-avatar.png",
    href: "/ai/docs/connections/dropbox",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA de gérer des fichiers, de partager du contenu Dropbox à des fins d'analyse et d'automatiser le traitement des documents."
  },
  {
    id: "fitbit",
    title: "Fitbit",
    icon: "/docs/images/ai/connections/fitbit-avatar.png",
    href: "/ai/docs/connections/fitbit",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA d'accéder aux données de santé Fitbit, de suivre les objectifs de mise en forme et de gérer les profils utilisateur."
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "/docs/images/ai/connections/hugging-face-avatar.png",
    href: "/ai/docs/connections/hugging-face",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA d'accéder aux renseignements sur les modèles Hugging Face, de gérer les jeux de données et de s'intégrer aux flux de production d'apprentissage automatique."
  },
  {
    id: "paypal",
    title: "PayPal",
    icon: "/docs/images/ai/connections/paypal-avatar.png",
    href: "/ai/docs/connections/paypal",
    status: "Available",
    type: "Social",
    description: "Permettez à votre agent d'IA d'accéder aux renseignements sur les transactions PayPal, de gérer les paiements et de s'intégrer aux flux de production financiers."
  }
]