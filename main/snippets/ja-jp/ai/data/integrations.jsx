export const integrationTypes = ["Social", "Enterprise"];

export const integrations = [
  {
    id: "gmail",
    title: "Gmail",
    icon: "/docs/images/ai/connections/gmail-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGmailメールの検索、作成、送信を許可します。"
  },
  {
    id: "google-calendar",
    title: "Google Calendar",
    icon: "/docs/images/ai/connections/google-calendar-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Calendarの予定の検索、登録、更新を許可します。"
  },
  {
    id: "google-drive",
    title: "Google Drive",
    icon: "/docs/images/ai/connections/google-drive-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Drive内のファイルの検索、作成、変更を許可します。"
  },
  {
    id: "google-sheets",
    title: "Google Sheets",
    icon: "/docs/images/ai/connections/google-sheets-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Sheets内のスプレッドシートの検索、作成、変更を許可します。"
  },
  {
    id: "google-slides",
    title: "Google Slides",
    icon: "/docs/images/ai/connections/google-slides-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Slides内のスライドの検索、作成、変更を許可します。"
  },
  {
    id: "google-contacts",
    title: "Google Contacts",
    icon: "/docs/images/ai/connections/google-contacts-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Contacts内の連絡先の検索、作成、変更を許可します。"
  },
  {
    id: "google-tasks",
    title: "Google Tasks",
    icon: "/docs/images/ai/connections/google-tasks-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGoogle Tasks内のタスクの検索、作成、変更を許可します。"
  },
  {
    id: "google-workspace",
    title: "Google Workspace",
    icon: "/docs/images/ai/connections/google-avatar.png",
    href: "/ai/docs/connections/google-workspace",
    status: "利用可能",
    type: "エンタープライズ",
    description: "AIエージェントによるGmail、Google Calendar、DriveなどのGoogle Workspaceサービスへのアクセスを許可します。"
  },
  {
    id: "youtube",
    title: "YouTube",
    icon: "/docs/images/ai/connections/youtube-avatar.png",
    href: "/ai/docs/connections/google",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるYouTube動画の検索、作成、管理を許可します。"
  },
  {
    id: "microsoft",
    title: "Microsoft",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft",
    status: "利用可能",
    type: "ソーシャル",
    description: "ユーザーのMicrosoft アカウントを通じて接続します。"
  },
  {
    id: "microsoft-azure",
    title: "Microsoft Entra (Azure AD)",
    icon: "/docs/images/ai/connections/microsoft-avatar.png",
    href: "/ai/docs/connections/microsoft-azure",
    status: "利用可能",
    type: "エンタープライズ",
    description: "AIエージェントによるOutlook、Teams、OneDriveなどのMicrosoft Entra（Azure AD）サービスへの接続を許可します。"
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/docs/images/ai/connections/github-avatar.png",
    href: "/ai/docs/connections/github",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるGitHubのIssueとプルリクエストの作成・管理を許可します。",
    styles: {
      filter: "var(--github-logo-filter, none)"
    }
  },
  {
    id: "slack",
    title: "Slackでサインイン",
    icon: "/docs/images/ai/connections/slack-avatar.png",
    href: "/ai/docs/connections/slack",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるSlackメッセージの送受信を許可します。"
  },
  {
    id: "box",
    title: "Box",
    icon: "/docs/images/ai/connections/box-avatar.png",
    href: "/ai/docs/connections/box",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるBox内のファイルの検索、作成、変更を許可します。"
  },
  {
    id: "oauth2",
    title: "OAuth2",
    icon: "/docs/images/ai/connections/oauth2-avatar.png",
    href: "/ai/docs/connections/oauth2",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるOAuth2準拠のIDプロバイダーまたはサービスへの接続を許可します。"
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    icon: "/docs/images/ai/connections/oidc-avatar.png",
    href: "/ai/docs/connections/oidc",
    status: "利用可能",
    type: "エンタープライズ",
    description: "AIエージェントによるOpenID Connect（OIDC）準拠のIDプロバイダーへの接続を許可します。"
  },
  {
    id: "discord",
    title: "Discord",
    icon: "/docs/images/ai/connections/discord-avatar.png",
    href: "/ai/docs/connections/discord",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによる新規メンバーの歓迎、音楽の再生、ユーザーロールの管理、他のサービスと連携した通知の投稿を許可します。"
  },
  {
    id: "figma",
    title: "Figma",
    icon: "/docs/images/ai/connections/figma-avatar.png",
    href: "/ai/docs/connections/figma",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるアセットのエクスポート、プログラムによるデザインファイルの変更、プロトタイプへのコメントを通じたデザインフィードバックの自動化を許可します。"
  },
  {
    id: "freshbooks",
    title: "FreshBooks",
    icon: "/docs/images/ai/connections/fresh-books-avatar.png",
    href: "/ai/docs/connections/freshbooks",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによる請求書の作成・送信、領収書に基づく経費の追跡、クライアント情報の管理を許可します。"
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: "/docs/images/ai/connections/snapchat-avatar.png",
    href: "/ai/docs/connections/snapchat",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによるコンテンツ（写真、動画、リンク）のユーザーのSnapchatアカウントへの直接共有を許可します。"
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/docs/images/ai/connections/spotify-avatar.png",
    href: "/ai/docs/connections/spotify",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントによる音楽の検索、ユーザーの好みに応じたプレイリストの作成・変更、デバイスでの再生の制御、ユーザーのライブラリへの楽曲の追加を許可します。"
  },
  {
    id: "stripe",
    title: "Stripe Connect",
    icon: "/docs/images/ai/connections/stripe-avatar.png",
    href: "/ai/docs/connections/stripe-connect",
    status: "利用可能",
    type: "ソーシャル",
    description:
      "AIエージェントが、新規販売者の登録、顧客と販売者間の決済の促進、支払いの管理、マーケットプレイスの財務業務を行うプラットフォーム財務エージェントとして機能することを許可します。"
  },
  {
    id: "tumblr",
    title: "Tumblr",
    icon: "/docs/images/ai/connections/tumblr-avatar.png",
    href: "/ai/docs/connections/tumblr",
    status: "利用可能",
    type: "ソーシャル",
    description: "AIエージェントが新規投稿（テキスト、写真、動画）の作成と予約投稿、コンテンツのリブログ、ユーザーのブログテーマや設定の管理を行えるようにします。"
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: "/docs/images/ai/connections/amazon-avatar.png",
    href: "/ai/docs/connections/amazon",
    status: "Available",
    type: "Social",
    description:
      "AIエージェントがAmazonの出品者として在庫の管理、商品リストの更新、売上実績の追跡を行えるようにします。また消費者向けには、商品の価格や在庫状況を追跡するショッピングエージェントとしても機能します。"
  },
  {
    id: "basecamp",
    title: "Basecamp",
    icon: "/docs/images/ai/connections/basecamp-avatar.png",
    href: "/ai/docs/connections/basecamp",
    status: "Available",
    type: "Social",
    description: "AIエージェントがBasecampでプロジェクト、ToDoリスト、メッセージ、スケジュール、チームでの共同作業を管理できるようにします。"
  },
  {
    id: "digitalocean",
    title: "DigitalOcean",
    icon: "/docs/images/ai/connections/digitalocean-avatar.png",
    href: "/ai/docs/connections/digitalocean",
    status: "Available",
    type: "Social",
    description: "AIエージェントがクラウドインフラ、Droplet、Kubernetesクラスターのプロビジョニングと管理を行い、導入ワークフローを自動化できるようにします。"
  },
  {
    id: "salesforce",
    title: "Salesforce",
    icon: "/docs/images/ai/connections/salesforce-avatar.png",
    href: "/ai/docs/connections/salesforce",
    status: "Available",
    type: "Social",
    description: "AIエージェントがSalesforceで顧客レコードへのアクセス、商談の管理、CRMワークフローの自動化を行えるようにします。"
  },
  {
    id: "twitch",
    title: "Twitch",
    icon: "/docs/images/ai/connections/twitch-avatar.png",
    href: "/ai/docs/connections/twitch",
    status: "Available",
    type: "Social",
    description: "AIエージェントがTwitchのストリーミングデータへのアクセス、配信の管理、ゲーム関連のワークフローとの連携を行えるようにします。"
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    icon: "/docs/images/ai/connections/x-avatar.png",
    href: "/ai/docs/connections/twitter",
    status: "Available",
    type: "Social",
    description: "AIエージェントがツイートの投稿、フォロワーの管理、ソーシャルメディアのワークフローとの連携を行えるようにします。"
  },
  {
    id: "bitbucket",
    title: "Bitbucket",
    icon: "/docs/images/ai/connections/bitbucket-avatar.png",
    href: "/ai/docs/connections/bitbucket",
    status: "Available",
    type: "Social",
    description: "AIエージェントがBitbucketのリポジトリの管理、課題の追跡、コードリポジトリでの作業の自動化を行えるようにします。"
  },
  {
    id: "dropbox",
    title: "Dropbox",
    icon: "/docs/images/ai/connections/dropbox-avatar.png",
    href: "/ai/docs/connections/dropbox",
    status: "Available",
    type: "Social",
    description: "AIエージェントがファイルの管理、分析用のDropboxコンテンツの共有、ドキュメント処理の自動化を行えるようにします。"
  },
  {
    id: "fitbit",
    title: "Fitbit",
    icon: "/docs/images/ai/connections/fitbit-avatar.png",
    href: "/ai/docs/connections/fitbit",
    status: "Available",
    type: "Social",
    description: "AIエージェントがFitbitの健康データへのアクセス、フィットネス目標の追跡、ユーザープロファイルの管理を行えるようにします。"
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "/docs/images/ai/connections/hugging-face-avatar.png",
    href: "/ai/docs/connections/hugging-face",
    status: "Available",
    type: "Social",
    description: "AIエージェントがHugging Faceのモデル情報へのアクセス、データセットの管理、機械学習ワークフローとの連携を行えるようにします。"
  },
  {
    id: "paypal",
    title: "PayPal",
    icon: "/docs/images/ai/connections/paypal-avatar.png",
    href: "/ai/docs/connections/paypal",
    status: "Available",
    type: "Social",
    description: "AIエージェントがPayPalの取引情報へのアクセス、支払いの管理、財務ワークフローとの連携を行えるようにします。"
  }
]