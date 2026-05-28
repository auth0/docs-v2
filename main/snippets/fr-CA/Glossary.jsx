export const GlossaryPage = () => {
  const GLOSSARY = [
    {
      term: "Access Token",
      description:
        "Identifiant pouvant être utilisé par une application pour accéder à une API. Il informe l'API que le porteur du jeton a été autorisé à y accéder et à effectuer les actions spécifiques définies par le scope accordé. Un jeton d'accès peut être dans n'importe quel format, mais deux options courantes sont les chaînes opaques et les JSON Web Tokens (JWT). Il doit être transmis à l'API en tant qu'identifiant Bearer dans un en-tête HTTP Authorization."
    },
    {
      term: "Account Linking",
      description: "Liaison de comptes utilisateurs sur plusieurs plateformes permettant aux utilisateurs d'accéder à plusieurs ressources ou applications en fournissant leurs identifiants une seule fois."
    },
    {
      term: "Actions",
      description:
        "Fonctions sécurisées, propres à un locataire et versionnées, écrites en Node.js, qui s'exécutent à certains moments du cycle d'exécution d'Auth0. Les Actions servent à personnaliser et à étendre les capacités d'Auth0 avec une logique personnalisée."
    },
    {
      term: "Adaptive Multi-factor Authentication",
      description:
        "Authentification multifacteur (MFA) qui n'est déclenchée que lorsqu'une tentative de connexion est jugée peu fiable. Avec la MFA adaptative, Auth0 déclenche la MFA uniquement lorsque nécessaire, afin de créer des obstacles pour les acteurs malveillants tout en préservant l'expérience de connexion des utilisateurs légitimes."
    },
    {
      term: "Application",
      description: "Votre logiciel qui s'appuie sur Auth0 pour l'authentification et la gestion des identités. Auth0 prend en charge les applications monopage, les applications web classiques, les applications natives et les applications machine à machine."
    },
    {
      term: "Attack Protection",
      description:
        "Fonctionnalités qu'Auth0 offre pour détecter et contrer les attaques, notamment la protection contre les attaques par force brute, la limitation des adresses IP suspectes, la détection des mots de passe compromis, la détection des robots et l'authentification multifacteur adaptative."
    },
    {
      term: "Audience",
      description:
        "Identifiant unique de l'audience pour un jeton émis, identifié dans un JSON Web Token par la revendication aud. La valeur de l'audience correspond soit à l'application (ID client) pour un ID Token, soit à l'API appelée (identifiant d'API) pour un jeton d'accès. Chez Auth0, la valeur d'Audience envoyée dans une demande de jeton d'accès détermine si ce jeton est retourné au format opaque ou JWT."
    },
    {
      term: "Auth0 Dashboard",
      description: "L'interface d'administration principale d'Auth0 dans laquelle vous pouvez enregistrer votre application ou API, vous connecter à un magasin d'utilisateurs ou à un autre fournisseur d'identité, et configurer vos services Auth0."
    },
    {
      term: "Authentication Device",
      description: "L'appareil sur lequel l'utilisateur s'authentifie et accorde son consentement dans le flux d'authentification par canal arrière initié par le client."
    },
    {
      term: "Authentication Server",
      description:
        "Serveur qui confirme ou refuse l'identité d'un utilisateur. Un serveur d'authentification ne limite pas les actions ou les ressources accessibles à l'utilisateur (bien qu'il puisse fournir un contexte à cette fin)."
    },
    {
      term: "Authorization Code",
      description:
        "Chaîne aléatoire générée par le serveur d'autorisation et retournée à l'application dans le cadre de la réponse d'autorisation. Le code d'autorisation a une durée de vie relativement courte et est échangé contre un jeton d'accès au point de terminaison de jeton lors de l'utilisation du flux de code d'autorisation (avec ou sans Proof Key for Code Exchange (PKCE))."
    },
    {
      term: "Authorization Flow",
      description:
        "Autre nom pour les octrois d'autorisation définis dans OAuth 2.0. Les flux d'autorisation sont les processus qu'une ressource (une application ou une AIP) utilise pour accorder l'accès aux demandeurs. Selon le type de technologie et le type de demandeur, les propriétaires de ressources peuvent utiliser le flux de code d'autorisation, PKCE, ROPG, Implicit ou Client Credential."
    },
    {
      term: "Authorization Server",
      description:
        "Serveur centralisé qui contribue à définir les limites de l'accès d'un utilisateur. Par exemple, votre serveur d'autorisation peut contrôler les données, les tâches et les fonctionnalités accessibles à un utilisateur. Un serveur d'autorisation n'authentifie pas les utilisateurs. C'est le rôle du serveur d'authentification de vérifier l'identité d'un utilisateur."
    },
    {
      term: "Bad Actors",
      description:
        "Également appelés acteurs malveillants. Entité (personne ou groupe) qui représente une menace pour l'entreprise ou l'environnement avec l'intention de causer des dommages. Ces dommages peuvent être physiques ou informatiques, allant de l'intrusion dans un centre de données au piratage de systèmes à l'aide d'identifiants volés."
    },
    {
      term: "Beta",
      description:
        "Étape du cycle de publication d'un produit durant laquelle la fonctionnalité ou le comportement référencé est mis à la disposition des abonnés pour leur permettre d'explorer et d'adopter les nouvelles capacités du produit, tout en recueillant leurs commentaires finaux avant une publication GA. La fonctionnalité est complète au niveau du code, stable, utile dans divers scénarios, et est censée satisfaire ou presque satisfaire les attentes de qualité d'une publication GA. Les versions bêta peuvent être privées ou publiques."
    },
    {
      term: "Block/Unblock Users",
      description:
        "Suppression ou rétablissement de l'accès d'un demandeur à une ressource. Fait référence aux fonctionnalités de la suite Attack Protection d'Auth0. Chaque service évalue les tendances de connexion et d'inscription et bloque les adresses IP associées à des activités suspectes."
    },
    {
      term: "Bot Detection",
      description: "Forme de protection contre les attaques dans laquelle Auth0 bloque le trafic de robots présumés en activant un CAPTCHA lors du processus de connexion."
    },
    {
      term: "Breached Password Detection",
      description: "Forme de protection contre les attaques dans laquelle Auth0 avertit vos utilisateurs s'ils utilisent une combinaison nom d'utilisateur/mot de passe qui a été compromise lors d'une fuite de données sur un site web ou une application tierce."
    },
    {
      term: "Breaking Change",
      description: "Modification apportée à la plateforme Auth0 qui, à la connaissance d'Auth0, entraînera des défaillances dans l'interopérabilité entre la plateforme Auth0 et les applications des clients."
    },
    {
      term: "Brute-force Protection",
      description: "Forme de protection contre les attaques qui protège contre les attaques par force brute provenant d'une seule adresse IP et ciblant un seul compte utilisateur."
    },
    {
      term: "Callback",
      description: "URL à laquelle Auth0 envoie sa réponse après l'authentification. Il s'agit souvent de la même URL vers laquelle l'utilisateur est redirigé après l'authentification."
    },
    {
      term: "Claim",
      description: "Attribut inclus dans un jeton de sécurité qui représente une affirmation que le fournisseur du jeton fait à propos d'une entité."
    },
    {
      term: "Client ID",
      description:
        "Valeur d'identification attribuée à votre application après l'enregistrement. Cette valeur est utilisée conjointement avec d'autres services tiers et se trouve dans Auth0 Dashboard > Paramètres de l'application."
    },
    {
      term: "Client Secret",
      description:
        "Secret utilisé par une application pour s'authentifier auprès du serveur d'autorisation ; il ne doit être connu que de l'application et du serveur d'autorisation, et doit être suffisamment aléatoire pour ne pas pouvoir être deviné."
    },
    {
      term: "Confidential Client",
      description:
        "Selon le protocole OAuth 2.0, les applications peuvent être classées comme confidentielles ou publiques. Les applications confidentielles peuvent stocker les identifiants de manière sécurisée et nécessitent un serveur backend de confiance pour ce faire. Elles peuvent utiliser des types d'octroi qui requièrent une authentification en spécifiant leur ID client et leur secret lors de l'appel au point de terminaison de jeton."
    },
    {
      term: "Confused Deputy",
      description: "Situation dans laquelle un attaquant amène une application ou un service à effectuer une action en son nom."
    },
    {
      term: "Connection",
      description: "Relation entre Auth0 et les sources d'utilisateurs pour vos applications. Les exemples incluent les fournisseurs d'identité, les méthodes d'authentification Passwordless et les bases de données d'utilisateurs."
    },
    {
      term: "Consumption Device",
      description: "L'appareil qui permet à l'utilisateur de consommer un service dans le flux d'authentification par canal arrière initié par le client."
    },
    {
      term: "Custom Domain",
      description: "Domaine tiers avec un nom personnalisé ou de marque. Également connu sous le nom de CNAME."
    },
    {
      term: "Deprecation",
      description:
        "Étape du cycle de publication d'un produit indiquant que la fonctionnalité ou le comportement référencé n'est pas pris en charge pour les nouveaux abonnés, n'est pas activement amélioré et ne fait l'objet que d'une maintenance minimale."
    },
    {
      term: "Digital Identity",
      description: "Ensemble d'attributs qui définissent un utilisateur particulier dans le contexte d'une fonction fournie par une application donnée."
    },
    {
      term: "Digital Signature",
      description:
        "Chaîne chiffrée qui protège les bits d'un jeton contre toute altération. Si les bits sont modifiés ou altérés, la signature ne pourra plus être vérifiée et sera rejetée."
    },
    {
      term: "Directory",
      description:
        "Référentiel centralisé d'utilisateurs (dont le plus connu est Active Directory) qui centralise les identifiants et les attributs, rendant inutile la mise en place d'une gestion d'identité locale pour chaque application."
    },
    {
      term: "Early Access",
      description:
        "Étape du cycle de publication d'un produit durant laquelle la fonctionnalité ou le comportement référencé est mis à la disposition d'un nombre limité d'abonnés ou de partenaires de développement clients (CDP) pour être testé et faire l'objet de commentaires."
    },
    {
      term: "End of Life",
      description: "Étape de mise en production indiquant que la fonctionnalité ou le comportement référencé a été retiré de la plateforme. Une utilisation continue entraînera probablement des erreurs."
    },
    {
      term: "Date de fin de vie",
      description: "Date à laquelle l'accès à une fonctionnalité ou à un comportement est retiré de la plateforme. Les dates de fin de vie peuvent varier selon les types de forfaits."
    },
    {
      term: "Autorisation granulaire (FGA)",
      description: "Produit SaaS d'Auth0 qui accorde aux utilisateurs individuels l'accès à des objets ou des ressources spécifiques au sein de votre application."
    },
    {
      term: "Flux",
      description:
        "Processus pouvant être étendus à l'aide d'Actions. Chaque flux est composé d'un ou de plusieurs déclencheurs et représente le pipeline logique par lequel l'information transite à un point précis du parcours Auth0."
    },
    {
      term: "Disponibilité générale",
      description: "Étape de mise en production durant laquelle la fonctionnalité ou le comportement référencé est entièrement fonctionnel et disponible pour tous les abonnés en environnement de production."
    },
    {
      term: "Groupe",
      description: "Ensemble d'un ou de plusieurs utilisateurs. Dans l'extension d'autorisation Auth0, les groupes permettent d'accorder l'accès à de nombreux utilisateurs simultanément."
    },
    {
      term: "ID Token",
      description: "Identifiant destiné à l'application elle-même, plutôt qu'à l'accès à une ressource. Il possède un format fixe que les applications peuvent analyser et valider."
    },
    {
      term: "Fournisseur d'identité (IdP)",
      description: "Service qui stocke et gère les identités numériques. Auth0 prend en charge les fournisseurs d'identité sociaux, d'entreprise et légaux de confiance."
    },
    {
      term: "JSON Web Token (JWT)",
      description:
        "Méthode ouverte et standard de l'industrie (RFC 7519) permettant de représenter des revendications de manière sécurisée entre deux parties. Chez Auth0, les ID Tokens sont toujours retournés au format JWT, et les jetons d'accès le sont souvent aussi."
    },
    {
      term: "Localisation",
      description: "Capacité à afficher la nouvelle expérience Universal Login dans une langue prise en charge."
    },
    {
      term: "Lock",
      description: "Widget d'interface utilisateur d'Auth0 pour l'authentification des utilisateurs. Prêt à l'emploi sans configuration, il constitue l'interface par défaut de l'expérience Universal Login classique."
    },
    {
      term: "Management API",
      description: "L'API d'Auth0 permettant de gérer les services Auth0 et d'effectuer des tâches administratives de manière programmatique."
    },
    {
      term: "Métadonnées",
      description: "Informations que les utilisateurs peuvent mettre à jour, telles que les préférences ou les paramètres de profil. Les métadonnées sont ajoutées aux jetons d'identité et peuvent être stockées dans les profils utilisateurs."
    },
    {
      term: "Migration",
      description: "Processus par lequel un client abandonne une fonctionnalité ou un comportement particulier. Les migrations devraient avoir lieu durant la phase de dépréciation."
    },
    {
      term: "Authentification multifacteur (MFA)",
      description: "Processus d'authentification qui prend en compte plusieurs facteurs. En général, le premier facteur est le nom d'utilisateur et le mot de passe, et le second est un code ou un lien par courriel/SMS, ou un OTP via une application."
    },
    {
      term: "Nonce",
      description: "Nombre arbitraire (souvent aléatoire ou pseudo-aléatoire) émis dans un protocole d'authentification pouvant être utilisé pour détecter et atténuer les attaques par rejeu."
    },
    {
      term: "OAuth 2.0",
      description:
        "Cadre d'autorisation qui définit les protocoles et les flux d'autorisation. OAuth 2.0 définit les rôles, les octrois d'autorisation, les demandes et réponses d'autorisation, ainsi que la gestion des jetons."
    },
    {
      term: "OpenID",
      description: "Standard ouvert pour l'authentification qui permet aux applications de vérifier l'identité des utilisateurs sans avoir à collecter ni stocker leurs informations de connexion."
    },
    {
      term: "Organisations",
      description: "Produit Auth0 qui permet aux clients B2B de catégoriser les utilisateurs finaux et de définir des rôles spécifiques, une expérience de connexion et un accès aux ressources."
    },
    {
      term: "Passwordless",
      description: "Forme d'authentification où le premier facteur n'est pas un mot de passe. Il peut s'agir d'un mot de passe à usage unique reçu par courriel ou SMS, d'une notification push ou d'un capteur biométrique."
    },
    {
      term: "Périmètre",
      description: "Ensemble de limites qui englobent un répertoire, tous ses utilisateurs et toutes les applications qui utilisent ce répertoire."
    },
    {
      term: "Étapes de mise en production",
      description: "Phases qui décrivent la façon dont Auth0 prépare, publie et retire les fonctionnalités de ses produits."
    },
    {
      term: "Application publique",
      description:
        "Selon le protocole OAuth 2.0, les applications peuvent être confidentielles ou publiques. Les applications publiques ne peuvent pas conserver les identifiants de manière sécurisée et ne devraient donc utiliser que des types d'octroi qui ne nécessitent pas l'utilisation de leur secret client."
    },
    {
      term: "Identifiant brut",
      description: "Secret partagé ou ensemble d'informations convenus entre l'utilisateur et la ressource, permettant à la ressource de vérifier l'identité d'un utilisateur."
    },
    {
      term: "Jeton d'actualisation",
      description: "Type spécial de jeton pouvant être utilisé pour obtenir un nouveau jeton d'accès. Il est utile pour renouveler les jetons d'accès arrivant à expiration sans obliger l'utilisateur à se reconnecter."
    },
    {
      term: "Rotation des jetons d'actualisation",
      description: "Stratégie consistant à remplacer fréquemment les jetons d'actualisation afin de minimiser les vulnérabilités. Chaque échange retourne également un nouveau jeton d'actualisation."
    },
    {
      term: "Partie utilisatrice",
      description: "Entité (telle qu'un service ou une application) qui dépend d'un fournisseur d'identité tiers pour authentifier un utilisateur."
    },
    {
      term: "Propriétaire de la ressource",
      description: "Entité (telle qu'un utilisateur ou une application) capable d'accorder l'accès à une ressource protégée."
    },
    {
      term: "Serveur de ressources",
      description: "Serveur hébergeant des ressources protégées. Les serveurs de ressources acceptent les demandes de ressources protégées et y répondent."
    },
    {
      term: "Rôle",
      description: "Aspect de l'identité d'un utilisateur qui lui est attribué pour indiquer le niveau d'accès dont il devrait disposer dans le système."
    },
    {
      term: "Scope",
      description: "Mécanisme qui définit les actions spécifiques que les applications sont autorisées à effectuer ou les informations qu'elles peuvent demander au nom d'un utilisateur."
    },
    {
      term: "Security Assertion Markup Language (SAML)",
      description: "Protocole standardisé basé sur XML permettant à deux parties d'échanger des informations d'authentification sans utiliser de mot de passe."
    },
    {
      term: "Jeton de sécurité",
      description: "Artefact signé numériquement utilisé pour prouver que l'utilisateur a été authentifié avec succès."
    },
    {
      term: "Cookie de session",
      description: "Entité émise par un intergiciel après avoir établi que le jeton reçu est signé, valide et provient d'une source de confiance."
    },
    {
      term: "Compte fantôme",
      description: "Pratique difficile à maintenir consistant à provisionner manuellement un utilisateur d'un répertoire local séparément dans un répertoire distant lorsqu'il a besoin d'accéder à des applications distantes."
    },
    {
      term: "Algorithme de signature",
      description: "Algorithme de hachage utilisé pour signer numériquement les jetons afin de s'assurer qu'ils n'ont pas été altérés."
    },
    {
      term: "Authentification unique (SSO)",
      description: "Service qui, après qu'un utilisateur s'est connecté à une application, le connecte automatiquement aux autres applications. La déconnexion unique fonctionne de façon similaire, mais en sens inverse."
    },
    {
      term: "Abonnement",
      description: "Entente qui définit les fonctionnalités et les quotas disponibles pour chacun de vos locataires."
    },
    {
      term: "Limitation des adresses IP suspectes",
      description: "Forme de protection contre les attaques qui protège votre locataire contre les tentatives de connexion suspectes ciblant trop de comptes depuis une seule adresse IP."
    },
    {
      term: "Locataire",
      description: "Groupe d'utilisateurs logiquement isolé qui partage un accès commun avec des privilèges spécifiques à une seule instance logicielle."
    },
    {
      term: "Point de terminaison de jeton",
      description: "Point de terminaison sur le serveur d'autorisation utilisé pour demander des jetons de manière programmatique."
    },
    {
      term: "Déclencheur",
      description: "Événement qui invoque automatiquement une Action lorsqu'une opération spécifique, telle que la connexion d'un utilisateur, se produit à l'exécution."
    },
    {
      term: "Confiance",
      description: "Une ressource fait confiance à un fournisseur d'identité ou à une autorité lorsqu'elle est prête à accepter ce que cette autorité affirme au sujet de ses utilisateurs."
    },
    {
      term: "Universal Login",
      description: "L'implémentation par Auth0 du flux d'authentification, qui est la fonctionnalité clé d'un serveur d'autorisation."
    },
    {
      term: "Web Service Federation (WS-Fed)",
      description: "Protocole de gestion des identités des utilisateurs entre systèmes, domaines et fournisseurs d'identité avec une confiance établie à l'aide de WS-Trust. Principalement utilisé pour les produits Microsoft."
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
            placeholder="Rechercher par nom"
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
              aria-label={`Aller à ${letter}`}
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

        {groups.size === 0 && <p className="text-gray-500 dark:text-gray-400">Aucun résultat pour « {term} ». Essayez un autre terme.</p>}
      </section>
    </div>
  )
}