export const GlossaryPage = () => {
  const GLOSSARY = [
    {
      term: "Access Token",
      description:
        "アプリケーションがAPIにアクセスするために使用できる認証情報です。付与されたスコープで指定された特定のアクションを実行する権限がトークンの所持者に与えられていることをAPIに通知します。アクセストークンはあらゆる形式を使用できますが、一般的な形式として不透明な文字列とJSON Web Token（JWT）の2種類があります。HTTPのAuthorizationヘッダーにBearerクレデンシャルとしてAPIに送信する必要があります。"
    },
    {
      term: "Account Linking",
      description: "複数のプラットフォームにわたるユーザーアカウントを連携させ、一度の認証情報の提供で複数のリソースやアプリケーションにアクセスできるようにする機能です。"
    },
    {
      term: "Actions",
      description:
        "Auth0のランタイム中の特定のポイントで実行される、Node.jsで記述されたセキュアなテナント固有のバージョン管理された関数です。ActionsはカスタムロジックによってAuth0の機能をカスタマイズおよび拡張するために使用されます。"
    },
    {
      term: "Adaptive Multi-factor Authentication",
      description:
        "試行されたログインが低信頼度と判断された場合にのみトリガーされる多要素認証（MFA）です。適応型MFAにより、Auth0は必要な場合にのみMFAをトリガーして悪意のある行為者に摩擦を加えつつ、正当なユーザーのログイン体験はそのまま維持します。"
    },
    {
      term: "Application",
      description: "認証とID管理をAuth0に依存するソフトウェアです。Auth0はシングルページ、通常のウェブ、ネイティブ、およびマシン間通信アプリケーションをサポートしています。"
    },
    {
      term: "Attack Protection",
      description:
        "Auth0が攻撃の検出と軽減のために提供する機能です。ブルートフォース保護、不審なIPのスロットリング、漏洩パスワード検出、ボット検出、適応型多要素認証などが含まれます。"
    },
    {
      term: "Audience",
      description:
        "発行されたトークンのオーディエンスを示す一意の識別子で、JSON Web Token内ではaudクレームとして識別されます。オーディエンスの値は、IDトークンの場合はアプリケーション（クライアントID）、アクセストークンの場合は呼び出されるAPI（API識別子）のいずれかです。Auth0では、アクセストークンのリクエストで送信されるオーディエンスの値によって、そのトークンが不透明な形式で返されるかJWT形式で返されるかが決まります。"
    },
    {
      term: "Auth0 Dashboard",
      description: "アプリケーションやAPIの登録、ユーザーストアや他のIDプロバイダーへの接続、Auth0サービスの設定を行えるAuth0の主要な管理インターフェースです。"
    },
    {
      term: "Authentication Device",
      description: "クライアント起点のバックチャネル認証フローにおいて、ユーザーが認証を行い同意を付与するデバイスです。"
    },
    {
      term: "Authentication Server",
      description:
        "ユーザーのIDを確認または否定するサーバーです。認証サーバーはユーザーが利用できるアクションやリソースを制限しません（ただし、その目的のためにコンテキストを提供することはできます）。"
    },
    {
      term: "Authorization Code",
      description:
        "認可サーバーによって生成され、認可レスポンスの一部としてアプリケーションに返されるランダムな文字列です。認可コードは有効期間が比較的短く、認可コードフロー（Proof Key for Code Exchange（PKCE）の有無を問わず）を使用する際にトークンエンドポイントでアクセストークンと交換されます。"
    },
    {
      term: "Authorization Flow",
      description:
        "OAuth 2.0で定義された認可グラントの別名です。認可フローは、リソース（アプリケーションまたはAIP）がリクエスト者にアクセスを付与するために使用するワークフローです。技術の種類とリクエスト者の種類に応じて、リソースオーナーは認可コードフロー、PKCE、ROPG、インプリシット、またはクライアントクレデンシャルを使用できます。"
    },
    {
      term: "Authorization Server",
      description:
        "ユーザーのアクセス範囲の定義を担う集中型サーバーです。たとえば、認可サーバーはユーザーが利用できるデータ、タスク、機能を制御できます。認可サーバーはユーザーを認証しません。ユーザーのIDを確認するのは認証サーバーの役割です。"
    },
    {
      term: "Bad Actors",
      description:
        "脅威アクターとも呼ばれます。害を与える意図を持ってビジネスや環境に脅威をもたらすエンティティ（個人またはグループ）です。害はデータセンターへの不法侵入から盗まれた認証情報によるシステムへの不正アクセスまで、物理的またはサイバー上の損害を指します。"
    },
    {
      term: "Beta",
      description:
        "GAリリース前に最終フィードバックを提供しながら、新しい製品機能を探索・採用する時間をサブスクライバーに与えるために、対象の機能または動作がサブスクライバーに提供される製品リリースステージです。機能はコード完成済みで安定しており、さまざまなシナリオで有用であり、GAリリースの品質基準を満たすか、ほぼ満たすと考えられています。ベータリリースはプライベートまたはパブリックの場合があります。"
    },
    {
      term: "Block/Unblock Users",
      description:
        "リソースへのリクエスト者のアクセスを削除または復元することです。Auth0の攻撃保護スイートの機能を指します。各サービスはログイン/サインアップの傾向を評価し、不審なアクティビティに関連するIPアドレスをブロックします。"
    },
    {
      term: "Bot Detection",
      description: "Auth0がログインプロセス中にキャプチャを有効にすることで、ボットと疑われるトラフィックをブロックする攻撃保護の形式です。"
    },
    {
      term: "Breached Password Detection",
      description: "サードパーティのウェブサイトやアプリでのデータ漏洩によって侵害されたusername/パスワードの組み合わせをユーザーが使用した場合にAuth0がユーザーに通知する攻撃保護の形式です。"
    },
    {
      term: "Breaking Change",
      description: "Auth0の知る限り、Auth0プラットフォームと顧客アプリケーションの相互運用に障害を引き起こすAuth0プラットフォームへの変更です。"
    },
    {
      term: "Brute-force Protection",
      description: "単一のIPアドレスから発生し、単一のユーザーアカウントを標的とするブルートフォース攻撃から保護する攻撃保護の形式です。"
    },
    {
      term: "Callback",
      description: "認証後にAuth0がレスポンスを送信するURLです。多くの場合、認証後にユーザーがリダイレクトされるURLと同じです。"
    },
    {
      term: "Claim",
      description: "セキュリティトークンに含まれる属性で、トークンのプロバイダーがエンティティについて主張するクレームを表します。"
    },
    {
      term: "Client ID",
      description:
        "登録後にアプリケーションに割り当てられる識別値です。この値は他のサードパーティサービスと組み合わせて使用され、Auth0 Dashboard > アプリケーション設定で確認できます。"
    },
    {
      term: "Client Secret",
      description:
        "クライアント（アプリケーション）が認可サーバーで認証するために使用するシークレットです。クライアントと認可サーバーのみが知っている必要があり、推測されないよう十分にランダムでなければなりません。"
    },
    {
      term: "Confidential Client",
      description:
        "OAuth 2.0プロトコルでは、クライアント（アプリケーション）はコンフィデンシャルまたはパブリックのいずれかに分類されます。コンフィデンシャルクライアントは認証情報を安全に保持でき、そのためには信頼できるバックエンドサーバーが必要です。トークンエンドポイントを呼び出す際にクライアントIDとシークレットを指定することで、認証を必要とするグラントタイプを使用できます。"
    },
    {
      term: "Confused Deputy",
      description: "攻撃者がクライアントまたはサービスを騙して、攻撃者の代わりにアクションを実行させる状況です。"
    },
    {
      term: "Connection",
      description: "Auth0とアプリケーションのユーザーソースとの関係です。例としては、IDプロバイダー、パスワードレス認証方式、ユーザーデータベースなどがあります。"
    },
    {
      term: "Consumption Device",
      description: "クライアント起点のバックチャネル認証フローにおいて、ユーザーがサービスを利用する際に使用するデバイスです。"
    },
    {
      term: "Custom Domain",
      description: "特定の、またはバニティ名を持つサードパーティのドメインです。CNAMEとも呼ばれます。"
    },
    {
      term: "Deprecation",
      description:
        "対象の機能または動作が新規サブスクライバーにはサポートされず、積極的な機能強化も行われず、最小限のメンテナンスのみが行われていることを示す製品リリースステージです。"
    },
    {
      term: "Digital Identity",
      description: "特定のアプリケーションが提供する機能のコンテキストにおいて、特定のユーザーを定義する属性のセットです。"
    },
    {
      term: "Digital Signature",
      description:
        "トークン内のビットを改ざんから保護する暗号化された文字列です。ビットが変更または改ざんされた場合、署名を検証できなくなり、トークンは拒否されます。"
    },
    {
      term: "Directory",
      description:
        "ユーザーの集中型リポジトリ（最もよく知られているのはActive Directory）で、認証情報と属性を一元管理し、各アプリケーションが独自のローカルID設定を持つ必要をなくします。"
    },
    {
      term: "Early Access",
      description:
        "テストとフィードバックの提供を目的として、対象の機能または動作が限られた数のサブスクライバーまたはカスタマー開発パートナー（CDP）に提供される製品リリースステージです。"
    },
    {
      term: "End of Life",
      description: "参照されている機能または動作がプラットフォームから削除されたことを示す製品リリースステージです。継続して使用すると、エラーが発生する可能性があります。"
    },
    {
      term: "End of Life Date",
      description: "機能または動作へのアクセスがプラットフォームから削除される日付です。End Of Life Dateはプランの種類によって異なる場合があります。"
    },
    {
      term: "Fine-grained Authorization (FGA)",
      description: "アプリケーション内の特定のオブジェクトやリソースへのアクセスを個々のユーザーに付与するAuth0のSaaS製品です。"
    },
    {
      term: "Flow",
      description:
        "Actionsを使用して拡張できるプロセスです。各Flowは1つ以上のTriggerで構成され、Auth0のフローにおける特定のポイントで情報が流れる論理的なパイプラインを表します。"
    },
    {
      term: "General Availability",
      description: "参照されている機能または動作が完全に機能し、すべてのサブスクライバーが本番環境で利用できる製品リリースステージです。"
    },
    {
      term: "Group",
      description: "1人以上のユーザーの集合です。Auth0 Authorization Extensionでは、グループを使用して多数のユーザーに一度にアクセスを付与できます。"
    },
    {
      term: "ID Token",
      description: "リソースへのアクセスではなく、クライアント自身を対象とした認証情報です。クライアントが解析・検証できる固定フォーマットを持ちます。"
    },
    {
      term: "Identity Provider (IdP)",
      description: "デジタルIDを保存・管理するサービスです。Auth0は、信頼されたソーシャル、エンタープライズ、および法的IDプロバイダーをサポートしています。"
    },
    {
      term: "JSON Web Token (JWT)",
      description:
        "2者間でクレームを安全に表現するためのオープンな業界標準RFC 7519の方式です。Auth0では、IDトークンは常にJWT形式で返され、アクセストークンもJWT形式であることが多いです。"
    },
    {
      term: "Localization",
      description: "新しいUniversal Loginエクスペリエンスをサポートされている言語で表示する機能です。"
    },
    {
      term: "Lock",
      description: "ユーザーを認証するためのAuth0のUIウィジェットです。そのまま使用でき、Classic Universal Loginエクスペリエンスのデフォルトの外観となっています。"
    },
    {
      term: "Management API",
      description: "Auth0サービスを管理し、管理タスクをプログラムで実行するためのAuth0のAPIです。"
    },
    {
      term: "Metadata",
      description: "設定やプロフィール設定など、ユーザーが更新できる情報です。メタデータはIDトークンに追加され、ユーザープロフィールに保存できます。"
    },
    {
      term: "Migration",
      description: "顧客が特定の機能または動作から移行するプロセスです。移行はDeprecationステージ中に実施する必要があります。"
    },
    {
      term: "Multi-factor authentication (MFA)",
      description: "複数の要素を使用する認証プロセスです。通常、第1要素はusername/パスワードで、第2要素はメールアドレス/SMSによるcodeやリンク、またはアプリによるOTPです。"
    },
    {
      term: "Nonce",
      description: "認証プロトコルで発行される任意の（多くの場合ランダムまたは疑似ランダムな）数値で、リプレイ攻撃の検出と軽減に役立てることができます。"
    },
    {
      term: "OAuth 2.0",
      description:
        "認可プロトコルとワークフローを定義する認可フレームワークです。OAuth 2.0は、ロール、認可グラント、認可リクエストとレスポンス、およびトークン処理を定義します。"
    },
    {
      term: "OpenID",
      description: "ログイン情報を収集・保存することなく、アプリケーションがユーザーの本人確認を行えるようにする認証のオープン標準です。"
    },
    {
      term: "Organizations",
      description: "B2B顧客がエンドユーザーを分類し、特定のロール、ログインエクスペリエンス、およびリソースへのアクセスを定義できるAuth0の製品です。"
    },
    {
      term: "Passwordless",
      description: "第1要素がパスワードではない認証方式です。代わりに、メールアドレスやSMSで受信するワンタイムパスワード、プッシュ通知、または生体認証センサーを使用します。"
    },
    {
      term: "Perimeter",
      description: "ディレクトリ、そのすべてのユーザー、およびそのディレクトリを使用するすべてのアプリケーションを包含する境界の集合です。"
    },
    {
      term: "Product Release Stages",
      description: "Auth0が製品機能をステージング、リリース、および廃止する方法を説明するフェーズです。"
    },
    {
      term: "Public Client",
      description:
        "OAuth 2.0プロトコルでは、クライアントはコンフィデンシャルまたはパブリックのいずれかです。パブリッククライアントは認証情報を安全に保持できないため、クライアントシークレットを必要としないグラントタイプのみを使用する必要があります。"
    },
    {
      term: "Raw Credential",
      description: "ユーザーとリソース間で合意された共有シークレットまたは情報の集合で、リソースがユーザーのIDを検証できるようにするものです。"
    },
    {
      term: "Refresh Token",
      description: "更新されたアクセストークンを取得するために使用できる特殊なトークンです。ユーザーに再ログインを強制することなく、期限切れになるアクセストークンを更新するのに役立ちます。"
    },
    {
      term: "Refresh Token Rotation",
      description: "脆弱性を最小限に抑えるためにリフレッシュトークンを頻繁に置き換える戦略です。トークンを交換するたびに新しいリフレッシュトークンも返されます。"
    },
    {
      term: "Relying Party",
      description: "ユーザーを認証するためにサードパーティのIDプロバイダーに依存するエンティティ（サービスやアプリケーションなど）です。"
    },
    {
      term: "Resource Owner",
      description: "保護されたリソースへのアクセスを付与できるエンティティ（ユーザーやアプリケーションなど）です。"
    },
    {
      term: "Resource Server",
      description: "保護されたリソースをホストするサーバーです。リソースサーバーは保護されたリソースへのリクエストを受け付け、応答します。"
    },
    {
      term: "Role",
      description: "システムへのアクセスレベルを示すためにユーザーに割り当てられる、ユーザーのIDの一側面です。"
    },
    {
      term: "Scope",
      description: "アプリケーションがユーザーに代わって実行できる特定のアクションや要求できる情報を定義するメカニズムです。"
    },
    {
      term: "Security Assertion Markup Language (SAML)",
      description: "パスワードを使用せずに2者間で認証情報を交換できるXMLベースの標準化されたプロトコルです。"
    },
    {
      term: "Security Token",
      description: "ユーザーが正常に認証されたことを証明するために使用される、デジタル署名されたアーティファクトです。"
    },
    {
      term: "Session Cookie",
      description: "受信したトークンが署名済みで有効であり、信頼できるソースから来ていることを確認した後にミドルウェアによって発行されるエンティティです。"
    },
    {
      term: "Shadow Account",
      description: "リモートアプリケーションへのアクセスが必要な場合に、ローカルディレクトリのユーザーをリモートディレクトリに手動で個別にプロビジョニングする、維持が困難な慣行です。"
    },
    {
      term: "Signing Algorithm",
      description: "トークンが改ざんされていないことを保証するためにデジタル署名に使用されるハッシュアルゴリズムです。"
    },
    {
      term: "Single Sign-On (SSO)",
      description: "ユーザーが1つのアプリケーションにログインすると、他のアプリケーションにも自動的にログインするサービスです。Single Logoutはその逆の仕組みで同様に機能します。"
    },
    {
      term: "Subscription",
      description: "各テナントで利用可能な機能とクォータを定義する契約です。"
    },
    {
      term: "Suspicious IP Throttling",
      description: "単一のIPアドレスから多数のアカウントを標的とする不審なログインからテナントを保護する、攻撃防御の一形態です。"
    },
    {
      term: "Tenant",
      description: "単一のソフトウェアインスタンスへの特定の権限を持つ共通アクセスを共有する、論理的に分離されたユーザーのグループです。"
    },
    {
      term: "Token Endpoint",
      description: "プログラムでトークンをリクエストするために使用される認可サーバー上のエンドポイントです。"
    },
    {
      term: "Trigger",
      description: "ユーザーのログインなど、特定の操作が実行時に発生したときにActionを自動的に呼び出すイベントです。"
    },
    {
      term: "Trust",
      description: "リソースが、権限機関がそのユーザーについて述べることを信頼する場合、そのリソースはIDプロバイダーまたは権限機関を信頼していると言います。"
    },
    {
      term: "Universal Login",
      description: "認可サーバーの主要機能である認証フローのAuth0による実装です。"
    },
    {
      term: "Web Service Federation (WS-Fed)",
      description: "WS-Trustを使用して確立された信頼関係のもと、システム、ドメイン、およびIDプロバイダー間でユーザーIDを管理するためのプロトコルです。主にMicrosoft製品で使用されます。"
    }
  ]

  const A_TO_Z = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
  const norm = (s) => s.normalize("NFKD").toLowerCase().trim()

  const useQueryParamState = (key, initial = "") => {
    const [value, setValue] = useState(() => {
      if (typeof window === "undefined") return initial
      const url = new URL(window.location.href)
      return url.searchParams.get(key) ?? initial
    })

    useEffect(() => {
      if (typeof window === "undefined") return
      const url = new URL(window.location.href)
      if (value) url.searchParams.set(key, value)
      else url.searchParams.delete(key)
      window.history.replaceState({}, "", url.toString())
    }, [key, value])

    return [value, setValue]
  }

  const highlight = (text, query) => {
    if (!query) return text
    const i = norm(text).indexOf(norm(query))
    if (i < 0) return text
    const end = i + query.length
    return (
      <>
        {text.slice(0, i)}
        <mark>{text.slice(i, end)}</mark>
        {text.slice(end)}
      </>
    )
  }

  const [term, setTerm] = useQueryParamState("term", "")
  const groups = useMemo(() => {
    const filtered = term ? GLOSSARY.filter((g) => norm(g.term).includes(norm(term))) : GLOSSARY

    const map = new Map()
    for (const item of filtered.sort((a, b) => a.term.localeCompare(b.term))) {
      const key = (item.term[0] || "").toUpperCase()
      map.set(key, [...(map.get(key) || []), item])
    }
    return map
  }, [term])

  const letterRefs = useRef({})
  const handleJump = (letter) => {
    const el = letterRefs.current[letter]
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="mx-auto max-w-5xl py-10 text-gray-900 dark:text-gray-100">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            id="search-input-control"
            type="text"
            placeholder="名前で検索"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black pl-10 pr-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* A–Z index */}
      <nav className="mb-8 flex flex-wrap gap-3">
        {A_TO_Z.map((letter) => {
          const enabled = groups.has(letter)
          return (
            <button
              key={letter}
              onClick={() => enabled && handleJump(letter)}
              disabled={!enabled}
              className={`text-lg ${enabled ? "text-indigo-600 dark:text-indigo-300 hover:text-black dark:hover:text-white" : "text-gray-400 dark:text-gray-600 cursor-not-allowed"}`}
              aria-label={`${letter} へジャンプ`}
            >
              {letter}
            </button>
          )
        })}
      </nav>

      {/* Groups */}
      <section>
        {A_TO_Z.filter((L) => groups.has(L)).map((letter) => {
          const items = groups.get(letter)
          return (
            <section key={letter} className="mb-10">
              <div className="flex items-end gap-1">
                <h2 id={letter} ref={(el) => (letterRefs.current[letter] = el)} className="text-3xl font-semibold glossary_h2">
                  {letter}
                </h2>
                <div className="flex-1 border-b-2 border-[#3F59E4]" />
              </div>

              <ul className="mt-6 space-y-6 glossary_list">
                {items.map((it) => (
                  <li key={it.term} className="scroll-mt-24">
                    <h3 id={norm(it.term)} className="text-xl font-medium text-gray-900 dark:text-gray-100 glossary_h3">
                      {it.term}
                    </h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{highlight(it.description, term)}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {groups.size === 0 && <p className="text-gray-500 dark:text-gray-400">「{term}」に一致する結果はありません。別の用語で検索してみてください。</p>}
      </section>
    </div>
  )
}