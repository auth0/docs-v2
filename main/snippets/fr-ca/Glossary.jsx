export const GlossaryPage = () => {
  const GLOSSARY = [
    {
      term: "Jeton d'accès",
      description:
        "Identifiant pouvant être utilisé par une application pour accéder à une API. Il indique à l'API que le porteur du jeton a été autorisé à y accéder et à effectuer les actions spécifiques définies par la portée accordée. Un jeton d'accès peut prendre n'importe quel format, mais deux options courantes sont les chaînes opaques et les jetons JSON Web (JWT). Ils doivent être transmis à l'API en tant qu'identifiant Bearer dans un en-tête HTTP Authorization."
    },
    {
      term: "Liaison de comptes",
      description: "Association de comptes d'utilisateurs sur plusieurs plateformes pour permettre aux utilisateurs d'accéder à plusieurs ressources ou applications en fournissant leurs identifiants une seule fois."
    },
    {
      term: "Actions",
      description:
        "Fonctions sécurisées, propres à un tenant et versionnées, écrites en Node.js, qui s'exécutent à certains moments du cycle d'exécution d'Auth0. Les Actions servent à personnaliser et à étendre les capacités d'Auth0 avec une logique personnalisée."
    },
    {
      term: "Authentification multifacteur adaptative",
      description:
        "Authentification multifacteur (AMF) qui n'est déclenchée que lorsqu'une tentative de connexion est jugée peu fiable. Avec l'AMF adaptative, Auth0 déclenche l'AMF uniquement lorsque nécessaire afin de créer des obstacles pour les acteurs malveillants, tout en laissant l'expérience de connexion inchangée pour les utilisateurs légitimes."
    },
    {
      term: "Application",
      description: "Votre logiciel qui s'appuie sur Auth0 pour l'authentification et la gestion des identités. Auth0 prend en charge les applications monopage, les applications web classiques, les applications natives et les applications machine à machine."
    },
    {
      term: "Protection contre les attaques",
      description:
        "Fonctionnalités qu'Auth0 fournit pour détecter et contrer les attaques, notamment la protection contre les attaques par force brute, la limitation des adresses IP suspectes, la détection de mots de passe compromis, la détection de robots et l'authentification multifacteur adaptative."
    },
    {
      term: "Audience",
      description:
        "Identifiant unique de l'audience pour un jeton émis, identifié dans un JSON Web Token par la revendication aud. La valeur d'audience correspond soit à l'application (ID client) pour un jeton d'ID, soit à l'API appelée (identifiant d'API) pour un jeton d'accès. Chez Auth0, la valeur d'audience envoyée dans une demande de jeton d'accès détermine si ce jeton est retourné au format opaque ou JWT."
    },
    {
      term: "Tableau de bord Auth0",
      description: "Interface d'administration principale d'Auth0 dans laquelle vous pouvez enregistrer votre application ou API, vous connecter à un répertoire d'utilisateurs ou à un autre fournisseur d'identité, et configurer vos services Auth0."
    },
    {
      term: "Appareil d'authentification",
      description: "L'appareil sur lequel l'utilisateur s'authentifie et accorde son consentement dans le flux d'authentification par canal arrière initié par le client."
    },
    {
      term: "Serveur d'authentification",
      description:
        "Serveur qui confirme ou refuse l'identité d'un utilisateur. Un serveur d'authentification ne limite pas les actions ou les ressources disponibles pour l'utilisateur (bien qu'il puisse fournir un contexte à cette fin)."
    },
    {
      term: "Code d'autorisation",
      description:
        "Chaîne aléatoire générée par le serveur d'autorisation et renvoyée à l'application dans le cadre de la réponse d'autorisation. Le code d'autorisation est relativement éphémère et est échangé contre un jeton d'accès au point de terminaison de jeton lors de l'utilisation du flux de code d'autorisation (avec ou sans clé de preuve pour l'échange de code (PKCE))."
    },
    {
      term: "Flux d'autorisation",
      description:
        "Autre nom pour les octrois d'autorisation définis dans OAuth 2.0. Les flux d'autorisation sont les processus qu'une ressource (une application ou une AIP) utilise pour accorder l'accès aux demandeurs. Selon le type de technologie et le type de demandeur, les propriétaires de ressources peuvent utiliser le flux de code d'autorisation, PKCE, ROPG, Implicit ou Client Credential."
    },
    {
      term: "Serveur d'autorisation",
      description:
        "Serveur centralisé qui contribue à définir les limites de l'accès d'un utilisateur. Par exemple, votre serveur d'autorisation peut contrôler les données, les tâches et les fonctionnalités accessibles à un utilisateur. Un serveur d'autorisation n'authentifie pas les utilisateurs. C'est le rôle du serveur d'authentification de vérifier l'identité d'un utilisateur."
    },
    {
      term: "Acteurs malveillants",
      description:
        "Également appelés acteurs de menace. Entité (une personne ou un groupe) qui représente une menace pour l'entreprise ou l'environnement avec l'intention de causer des dommages. Ces dommages peuvent être physiques ou informatiques, allant de l'intrusion dans un centre de données au piratage de systèmes à l'aide d'identifiants volés."
    },
    {
      term: "Bêta",
      description:
        "Étape de publication d'un produit durant laquelle la fonctionnalité ou le comportement référencé est mis à la disposition des abonnés pour leur permettre d'explorer et d'adopter les nouvelles capacités du produit tout en fournissant des commentaires finaux avant une version GA. La fonctionnalité est complète sur le plan du code, stable, utile dans divers scénarios, et est censée répondre ou presque aux attentes de qualité d'une version GA. Les versions bêta peuvent être privées ou publiques."
    },
    {
      term: "Bloquer/Débloquer des utilisateurs",
      description:
        "Suppression ou rétablissement de l'accès d'un demandeur à une ressource. Fait référence aux fonctionnalités de la suite de protection contre les attaques d'Auth0. Chaque service évalue les tendances de connexion et d'inscription et bloque les adresses IP associées à des activités suspectes."
    },
    {
      term: "Détection de robots",
      description: "Forme de protection contre les attaques dans laquelle Auth0 bloque le trafic de robots présumés en activant un CAPTCHA lors du processus de connexion."
    },
    {
      term: "Détection de mots de passe compromis",
      description: "Forme de protection contre les attaques dans laquelle Auth0 avertit vos utilisateurs s'ils utilisent une combinaison nom d'utilisateur/mot de passe qui a été compromise lors d'une fuite de données sur un site web ou une application tierce."
    },
    {
      term: "Changement majeur",
      description: "Modification apportée à la plateforme Auth0 qui, à la connaissance d'Auth0, entraînera des défaillances dans l'interopérabilité de la plateforme Auth0 et des applications clientes."
    },
    {
      term: "Protection contre les attaques par force brute",
      description: "Forme de protection contre les attaques qui protège contre les attaques par force brute provenant d'une seule adresse IP et ciblant un seul compte utilisateur."
    },
    {
      term: "Rappel",
      description: "URL à laquelle Auth0 envoie sa réponse après l'authentification. Il s'agit souvent de la même URL vers laquelle un utilisateur est redirigé après l'authentification."
    },
    {
      term: "Revendication",
      description: "Attribut intégré dans un jeton de sécurité qui représente une affirmation que le fournisseur du jeton fait à propos d'une entité."
    },
    {
      term: "ID client",
      description:
        "Valeur d'identification attribuée à votre application après l'enregistrement. Cette valeur est utilisée conjointement avec d'autres services tiers et se trouve dans le tableau de bord Auth0 > Paramètres de l'application."
    },
    {
      term: "Secret client",
      description:
        "Secret utilisé par un client (application) pour s'authentifier auprès du serveur d'autorisation ; il ne doit être connu que du client et du serveur d'autorisation, et doit être suffisamment aléatoire pour ne pas pouvoir être deviné."
    },
    {
      term: "Client confidentiel",
      description:
        "Selon le protocole OAuth 2.0, les clients (applications) peuvent être classés comme confidentiels ou publics. Les clients confidentiels peuvent conserver les identifiants de manière sécurisée et nécessitent un serveur dorsal de confiance pour ce faire. Ils peuvent utiliser des types d'octroi qui requièrent une authentification en spécifiant leur ID client et leur secret lors de l'appel au point de terminaison de jeton."
    },
    {
      term: "Adjoint confus",
      description: "Situation dans laquelle un attaquant trompe un client ou un service pour lui faire effectuer une action en son nom."
    },
    {
      term: "Connexion",
      description: "Relation entre Auth0 et les sources d'utilisateurs pour vos applications. Les exemples incluent les fournisseurs d'identité, les méthodes d'authentification sans mot de passe ou les bases de données d'utilisateurs."
    },
    {
      term: "Appareil de consommation",
      description: "L'appareil qui permet à l'utilisateur d'accéder à un service dans le flux d'authentification par canal arrière initié par le client."
    },
    {
      term: "Domaine personnalisé",
      description: "Domaine tiers avec un nom spécialisé ou personnalisé. Également connu sous le nom de CNAME."
    },
    {
      term: "Dépréciation",
      description:
        "Étape de publication d'un produit indiquant que la fonctionnalité ou le comportement référencé n'est pas pris en charge pour les nouveaux abonnés, n'est pas activement amélioré et ne fait l'objet que d'une maintenance minimale."
    },
    {
      term: "Identité numérique",
      description: "Ensemble d'attributs qui définissent un utilisateur donné dans le contexte d'une fonction fournie par une application particulière."
    },
    {
      term: "Signature numérique",
      description:
        "Chaîne chiffrée qui protège les bits d'un jeton contre toute altération. Si les bits sont modifiés ou altérés, la signature ne pourra plus être vérifiée et sera rejetée."
    },
    {
      term: "Répertoire",
      description:
        "Référentiel centralisé d'utilisateurs (dont le plus connu est Active Directory) qui centralise les identifiants et les attributs, évitant ainsi à chaque application d'avoir sa propre configuration d'identité locale."
    },
    {
      term: "Accès anticipé",
      description:
        "Étape de publication d'un produit durant laquelle la fonctionnalité ou le comportement référencé est mis à la disposition d'un nombre limité d'abonnés ou de partenaires de développement client (PDC) pour qu'ils le testent et fournissent des commentaires."
    },
    {
      term: "Fin de vie",
      description: "Étape de publication du produit indiquant que la fonctionnalité ou le comportement référencé a été retiré de la plateforme. Une utilisation continue entraînera probablement des erreurs."
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
      term: "Flow",
      description:
        "Processus pouvant être étendus à l'aide d'Actions. Chaque Flow est composé d'un ou de plusieurs Triggers et représente le pipeline logique par lequel l'information transite à un point précis du parcours Auth0."
    },
    {
      term: "Disponibilité générale",
      description: "Étape de publication du produit durant laquelle la fonctionnalité ou le comportement référencé est entièrement fonctionnel et disponible pour tous les abonnés en production."
    },
    {
      term: "Groupe",
      description: "Ensemble d'un ou de plusieurs utilisateurs. Dans l'extension d'autorisation Auth0, les groupes permettent d'accorder l'accès à de nombreux utilisateurs à la fois."
    },
    {
      term: "Jeton d'identité (ID Token)",
      description: "Identifiant destiné au client lui-même, plutôt qu'à l'accès à une ressource. Il possède un format fixe que les clients peuvent analyser et valider."
    },
    {
      term: "Fournisseur d'identité (IdP)",
      description: "Service qui stocke et gère les identités numériques. Auth0 prend en charge les fournisseurs d'identité sociaux, d'entreprise et légaux de confiance."
    },
    {
      term: "JSON Web Token (JWT)",
      description:
        "Méthode ouverte et normalisée par l'industrie (RFC 7519) pour représenter des revendications de manière sécurisée entre deux parties. Chez Auth0, les jetons d'identité sont toujours retournés au format JWT, et les jetons d'accès le sont souvent aussi."
    },
    {
      term: "Localisation",
      description: "Capacité d'afficher l'expérience New Universal Login dans une langue prise en charge."
    },
    {
      term: "Lock",
      description: "Widget d'interface utilisateur d'Auth0 pour l'authentification des utilisateurs. Il est prêt à l'emploi et constitue l'interface par défaut de l'expérience Classic Universal Login."
    },
    {
      term: "API de gestion",
      description: "API d'Auth0 permettant de gérer les services Auth0 et d'effectuer des tâches administratives par programmation."
    },
    {
      term: "Métadonnées",
      description: "Informations que les utilisateurs peuvent mettre à jour, comme les préférences ou les paramètres de profil. Les métadonnées sont ajoutées aux jetons d'identité et peuvent être stockées dans les profils utilisateurs."
    },
    {
      term: "Migration",
      description: "Processus par lequel un client abandonne une fonctionnalité ou un comportement particulier. Les migrations devraient avoir lieu durant la phase de dépréciation."
    },
    {
      term: "Authentification multifacteur (AMF)",
      description: "Processus d'authentification qui prend en compte plusieurs facteurs. En général, le premier facteur est le nom d'utilisateur et le mot de passe, et le second est un code ou un lien par courriel ou SMS, ou un mot de passe à usage unique via une application."
    },
    {
      term: "Nonce",
      description: "Nombre arbitraire (souvent aléatoire ou pseudo-aléatoire) émis dans un protocole d'authentification pouvant servir à détecter et à atténuer les attaques par rejeu."
    },
    {
      term: "OAuth 2.0",
      description:
        "Cadre d'autorisation qui définit les protocoles et les flux d'autorisation. OAuth 2.0 définit les rôles, les octrois d'autorisation, les demandes et réponses d'autorisation, ainsi que la gestion des jetons."
    },
    {
      term: "OpenID",
      description: "Norme ouverte d'authentification permettant aux applications de vérifier l'identité des utilisateurs sans avoir à collecter ni stocker leurs informations de connexion."
    },
    {
      term: "Organisations",
      description: "Produit Auth0 permettant aux clients B2B de catégoriser les utilisateurs finaux et de définir des rôles spécifiques, une expérience de connexion et un accès aux ressources."
    },
    {
      term: "Sans mot de passe",
      description: "Forme d'authentification où le premier facteur n'est pas un mot de passe. Il peut s'agir d'un mot de passe à usage unique reçu par courriel ou SMS, d'une notification push ou d'un capteur biométrique."
    },
    {
      term: "Périmètre",
      description: "Ensemble de limites englobant un répertoire, tous ses utilisateurs et toutes les applications qui utilisent ce répertoire."
    },
    {
      term: "Étapes de publication du produit",
      description: "Phases décrivant la façon dont Auth0 prépare, publie et retire les fonctionnalités du produit."
    },
    {
      term: "Client public",
      description:
        "Selon le protocole OAuth 2.0, les clients peuvent être confidentiels ou publics. Les clients publics ne peuvent pas conserver les identifiants de manière sécurisée et ne devraient donc utiliser que des types d'octroi ne nécessitant pas l'utilisation de leur secret client."
    },
    {
      term: "Identifiant brut",
      description: "Secret partagé ou ensemble d'informations convenus entre l'utilisateur et la ressource, permettant à la ressource de vérifier l'identité d'un utilisateur."
    },
    {
      term: "Jeton d'actualisation (Refresh Token)",
      description: "Type de jeton spécial pouvant être utilisé pour obtenir un nouveau jeton d'accès. Il est utile pour renouveler les jetons d'accès arrivant à expiration sans obliger l'utilisateur à se reconnecter."
    },
    {
      term: "Rotation des jetons d'actualisation",
      description: "Stratégie consistant à remplacer fréquemment les jetons d'actualisation afin de réduire les vulnérabilités. Chaque échange retourne également un nouveau jeton d'actualisation."
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
      term: "Portée (Scope)",
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
      term: "Témoin de session",
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
      description: "Service qui, après qu'un utilisateur s'est connecté à une application, le connecte automatiquement aux autres applications également. La déconnexion unique fonctionne de façon similaire, mais en sens inverse."
    },
    {
      term: "Abonnement",
      description: "Entente qui définit les fonctionnalités et les quotas disponibles pour chacun de vos tenants."
    },
    {
      term: "Limitation des adresses IP suspectes",
      description: "Forme de protection contre les attaques qui protège votre tenant contre les connexions suspectes ciblant trop de comptes depuis une seule adresse IP."
    },
    {
      term: "Tenant",
      description: "Groupe d'utilisateurs logiquement isolé qui partagent un accès commun avec des privilèges spécifiques à une seule instance logicielle."
    },
    {
      term: "Point de terminaison de jeton",
      description: "Point de terminaison sur le serveur d'autorisation utilisé pour demander des jetons par programmation."
    },
    {
      term: "Trigger",
      description: "Événement qui invoque automatiquement une Action lorsqu'une opération spécifique, telle qu'une connexion d'utilisateur, se produit à l'exécution."
    },
    {
      term: "Confiance",
      description: "Une ressource fait confiance à un fournisseur d'identité ou à une autorité lorsqu'elle est prête à accepter ce que cette autorité affirme au sujet de ses utilisateurs."
    },
    {
      term: "Universal Login",
      description: "Implémentation par Auth0 du flux d'authentification, qui est la fonctionnalité clé d'un serveur d'autorisation."
    },
    {
      term: "Web Service Federation (WS-Fed)",
      description: "Protocole de gestion des identités utilisateurs entre systèmes, domaines et fournisseurs d'identité avec une confiance établie via WS-Trust. Principalement utilisé pour les produits Microsoft."
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

export const GlossaryFR = () => {
  const GLOSSARY = [
    {
      term: "Abonnement",
      description:
        "Entente qui définit les fonctionnalités et les quotas alloués à chacun de vos locataires. Auth0 propose plusieurs niveaux d'abonnement pour répondre aux besoins des différents développeurs et organisations."
    },
    {
      term: "Accès anticipé",
      description:
        "Phase de lancement du produit durant laquelle une fonctionnalité ou un comportement particulier est fourni à un nombre restreint d’abonnés ou de partenaires de développement client (CDP) afin qu’ils puissent l’essayer et nous faire part de leurs commentaires. À ce stade, celle-ci n’est pas encore terminée, mais elle est suffisamment avancée pour être testée."
    },
    {
      term: "Acteurs menaçants",
      description:
        "On appelle aussi ces individus ou groupes des auteurs de cybermenaces. Ce sont des entités qui représentent une menace pour une entreprise ou un environnement, avec l’intention de causer des dommages. Ces dommages peuvent être physiques ou informatiques, allant d’une intrusion dans un centre de données à un piratage de systèmes à l’aide d’identifiants volés."
    },
    {
      term: "Actions",
      description:
        "Fonctions sécurisées, propres au locataire, versionnées et écrites en Node.js qui s’exécutent à certains moments pendant le temps d’exécution d’Auth0. Les actions sont utilisées pour personnaliser et étendre les capacités d’Auth0 avec une logique personnalisée."
    },
    {
      term: "Algorithme de signature",
      description: "Algorithme de hachage utilisé pour signer numériquement les jetons afin de s’assurer qu’ils n’ont pas été altérés par des acteurs menaçants."
    },
    {
      term: "Appareil d’authentification",
      description: "dans le flux d’authentification par canal d’appui initié par le client."
    },
    {
      term: "Appareil de consommation",
      description: "L’appareil qui aide l’utilisateur à consommer un service dans le flux d’authentification par canal d’appui initié par le client."
    },
    {
      term: "Application",
      description:
        "Votre logiciel qui s’appuie sur Auth0 pour l’authentification et la gestion des identités. Auth0 prend en charge les applications Web classiques, les applications natives et les applications de communication entre machines."
    },
    {
      term: "Association de comptes",
      description:
        "Association de comptes d’utilisateurs sur plusieurs plateformes pour permettre aux utilisateurs d’accéder à plusieurs ressources ou applications en fournissant des identifiants une seule fois."
    },
    {
      term: "Audience",
      description:
        "Identifiant unique de l'audience d’un jeton émis, déterminé au sein d’un jeton Web JSON comme la demande **aud**. La valeur audience est soit l’application (ID client) pour un jeton d’ID, soit l’API appelée (`identifiant de l’API`) pour un jeton d’accès. Au sein d’Auth0, la valeur audience envoyée dans une demande de jeton d’accès dicte si ce jeton est renvoyé dans un format opaque ou JWT."
    },
    {
      term: "Auth0 Dashboard",
      description:
        "L’interface principale d’administration d’Auth0 dans laquelle vous pouvez enregistrer votre application ou API, vous connecter à un magasin d’utilisateurs ou à un autre fournisseur d’identité, et configurer vos services Auth0."
    },
    {
      term: "Authentification multifacteur (MFA)",
      description:
        "Processus d’authentification qui prend en compte plusieurs facteurs. En général, chez Auth0, le premier facteur est l’échange courant du nom d’utilisateur/mot de passe, et le deuxième est un code ou un lien par courriel ou SMS, un mot de passe à usage unique au moyen d’une application comme Authy ou GoogleºAuthenticator, ou une notification poussée au moyen d’une application pour téléphone, comme Guardian ou Duo. L’utilisation de plusieurs facteurs permet à votre compte de rester sécurisé même si une personne mal intentionnée obtient l’un ou l’autre des facteurs (par exemple, en volant votre mot de passe ou votre téléphone)."
    },
    {
      term: "Authentification multifacteur (MFA) adaptative",
      description:
        "L’authentification multifacteur (MFA) qui n’est déclenchée pour les utilisateurs que lorsqu’une tentative de connexion est déterminée comme étant une connexion de faible confiance. Avec Adaptive MFA, Auth0 ne déclenche l’authentification multifacteur (MFA) adaptative que lorsque c’est nécessaire pour ajouter de la friction pour les acteurs menaçants tout en gardant l’expérience de connexion inchangée pour les bons acteurs."
    },
    {
      term: "Authentification unique (SSO)",
      description:
        "Service qui, après qu’un utilisateur se soit connecté à une application, le connecte automatiquement à d’autres applications, quels que soient la plateforme, la technologie ou le domaine utilisés par l’utilisateur. L’utilisateur ne se connecte qu’une seule fois (d’où le nom de la fonctionnalité). On parle aussi de déconnexion unique (SLO) lorsqu’un utilisateur, après s’être déconnecté d’une application, est déconnecté de chaque application ou service où il était connecté. La SSO et la SLO sont rendues possibles grâce à l’utilisation de sessions."
    },
    {
      term: "Autorisation à granularité fine (FGA)",
      description: "Produit SaaS d’Auth0 qui permet à des utilisateurs individuels d’accéder à des objets ou ressources particulières au sein de votre application."
    },
    {
      term: "Bêta",
      description:
        "Phase de lancement du produit durant laquelle la fonctionnalité ou le comportement référencé est fourni aux abonnés. Cela leur permet d’explorer et d’adopter les nouvelles capacités du produit, tout en nous fournissant un retour d’information final avant la disponibilité générale (DG). La fonctionnalité est entièrement fonctionnelle, stable, adaptable à divers contextes et considérée comme répondant ou s’approchant des normes de qualité pour une version de disponibilité générale. Les versions bêta peuvent être restreintes à un nombre défini d’abonnés (privées) ou ouvertes à tous les abonnés (publiques)."
    },
    {
      term: "Bloquer/débloquer des utilisateurs",
      description:
        "Suppression ou restauration de l’accès d’un demandeur à une ressource. Fait référence aux fonctionnalités de la suite de protection contre les attaques d’Auth0 : détection de mots de passe compromis, protection contre les attaques par force brute et limitation des adresses IP suspectes. Chaque service évalue les tendances de connexion/signature et bloque les adresses IP associées à une activité suspecte."
    },
    {
      term: "Changement cassant",
      description: "Modification de la plateforme Auth0 qui, à la connaissance d’Auth0, entraînera des défaillances dans l’interopérabilité de la plateforme Auth0 et des applications clients."
    },
    {
      term: "Client confidentiel",
      description:
        "Selon le protocole OAuth 2.0, les clients (applications) peuvent être classés comme confidentiels ou publics selon qu’ils sont capables ou non de détenir des identifiants (telles qu’un identifiant client et un secret) en toute sécurité. Les clients confidentiels peuvent conserver des identifiants de manière sécurisée sans les exposer à des parties non autorisées et ont besoin d’un serveur dorsal de confiance pour ce faire. Ils peuvent utiliser des types d’autorisation qui exigent qu’ils s’authentifient en spécifiant leur ID client et leur secret lorsqu’ils appellent le point de terminaison du jeton et peuvent se voir délivrer des jetons signés de manière symétrique ou asymétrique."
    },
    {
      term: "Client public",
      description:
        "Selon le protocole OAuth 2.0, les clients (applications) peuvent être classés comme confidentiels ou publics selon qu’ils sont capables ou non de détenir des identifiants (telles qu’un ID client et un secret) en toute sécurité. Les clients publics ne peuvent pas détenir d’identifiants en toute sécurité et ne doivent donc utiliser que des types d’autorisation qui ne requièrent pas l’utilisation de leur secret client. Les jetons d’ID qui leur sont délivrés doivent être signés de manière asymétrique à l’aide d’une clé privée (RS256) et vérifiés à l’aide de la clé publique correspondant à la clé privée utilisée pour signer le jeton."
    },
    {
      term: "Code d’autorisation",
      description:
        "Chaîne aléatoire générée par le serveur d'autorisation et renvoyée à l'application dans le cadre de la réponse d'autorisation. Un code d'autorisation a une durée de vie relativement courte et est remplacé par un jeton d'accès au point de terminaison du jeton lors de l'utilisation du flux de code d'autorisation, avec ou sans Proof Key for Code Exchange (PKCE)."
    },
    {
      term: "Compte fantôme",
      description:
        "Cette pratique difficile à maintenir consiste à approvisionner manuellement un utilisateur d'un répertoire local séparément dans un répertoire distant (en créant essentiellement une copie, ou un compte fantôme, du compte d'origine) lorsqu'il a besoin d'accéder à des applications distantes."
    },
    {
      term: "Confiance",
      description: "Une ressource fait confiance à un fournisseur d'identité ou à une autorité lorsqu'elle est prête à accepter ce que l'autorité affirme au sujet de ses utilisateurs."
    },
    {
      term: "Connexion",
      description:
        "Relation entre Auth0 et les sources d'utilisateurs pour vos applications. Il peut s'agir, par exemple, de fournisseurs d'identité (tels que Google ou Active Directory), de méthodes d'authentification sans mot de passe ou de bases de données d'utilisateurs."
    },
    {
      term: "Connexion universelle",
      description:
        "Auth0 met en œuvre le flux d'authentification, qui constitue la fonctionnalité principale d'un serveur d'autorisation. Chaque fois qu'un utilisateur doit prouver son identité, vos applications effectuent une redirection vers la connexion universelle. Auth0 prend ensuite les mesures nécessaires pour confirmer l'identité de l'utilisateur."
    },
    {
      term: "Date de fin de vie",
      description: "Date à laquelle l'accès à une fonctionnalité ou à un comportement est supprimé de la plateforme. Les dates de fin de vie peuvent varier selon le type de plan."
    },
    {
      term: "Déclencheur",
      description:
        "Événement qui invoque automatiquement une action lorsqu'une opération particulière, telle que l'ouverture de session d'un utilisateur, se produit au moment de l'exécution. Certains déclencheurs s'exécutent de manière synchrone, bloquant le flux dans lequel ils s'inscrivent, tandis que d'autres s'exécutent de manière asynchrone."
    },
    {
      term: "Demande",
      description: "Attribut inclus dans un jeton de sécurité qui représente une affirmation que le fournisseur du jeton fait au sujet d'une entité."
    },
    {
      term: "Détection de mot de passe compromis",
      description:
        "Forme de protection contre les attaques par laquelle Auth0 avise vos utilisateurs s'ils utilisent une combinaison nom d'utilisateur/mot de passe qui a été compromise lors d'une fuite de données sur un site Web ou une application tierce."
    },
    {
      term: "Détection de robots",
      description: "Forme de protection contre les attaques par laquelle Auth0 bloque le trafic suspecté de provenir de robots en activant un CAPTCHA pendant le processus de connexion."
    },
    {
      term: "Disponibilité générale",
      description:
        "Phase de lancement du produit au cours de laquelle la fonctionnalité ou le comportement référencé est entièrement fonctionnel et accessible à tous les abonnés (selon le niveau de tarification) pour une utilisation en production. Lorsqu'une fonctionnalité existante est remplacée par une nouvelle version, Auth0 garantit une période de compatibilité rétroactive conformément à notre politique de dépréciation, et nous informons les clients pour leur permettre de s'adapter à la nouvelle version dans les délais impartis."
    },
    {
      term: "Domaine personnalisé",
      description: "Domaine tiers avec un nom spécialisé ou reflétant votre marque. Également appelé CNAME."
    },
    {
      term: "Données d'identification brutes",
      description: "Partage d'informations secrètes ou ensemble d'informations convenues entre l'utilisateur et la ressource servant à vérifier l'identité de l'utilisateur."
    },
    {
      term: "Fin de vie",
      description:
        "Étape de la phase de lancement du produit indiquant que la fonctionnalité ou le comportement référencé a été retiré de la plateforme. La poursuite de l'utilisation de la fonctionnalité ou du comportement entraînera probablement des erreurs. Le nouveau comportement sera automatiquement activé pour les locataires qui n'ont pas adopté cette option pendant la fenêtre de migration."
    },
    {
      term: "Flux",
      description:
        "Processus pouvant être étendus par des actions. Chaque flux est composé d'un ou de plusieurs déclencheurs et représente le pipeline logique dans lequel l'information circule à un moment donné du parcours Auth0."
    },
    {
      term: "Flux d'autorisation",
      description:
        "Autre nom pour les octrois d'autorisations décrits dans OAuth 2.0. Les flux d'autorisation sont les flux de production qu'une ressource (application ou API) utilise pour accorder l'accès aux demandeurs. Selon le type de technologie (p. ex., si une application peut stocker un secret client) et le type de demandeur, les propriétaires de ressources peuvent utiliser un flux de code d'autorisation, une preuve d'échange de clé de code (PKCE), les identifiants de mot de passe du propriétaire de ressource (ROPG), un flux implicite ou des identifiants client."
    },
    {
      term: "Fournisseur d'identité (IdP)",
      description:
        "Service de stockage et de gestion des identités numériques. Auth0 prend en charge les fournisseurs d'identité des réseaux sociaux, des entreprises et des organismes légaux de confiance. Auth0 peut également agir comme fournisseur d'identité pour vos applications."
    },
    {
      term: "Groupe",
      description: "Ensemble d'un ou plusieurs utilisateurs. Dans Auth0 Authorization Extension, utilisez les groupes pour accorder l'accès à plusieurs utilisateurs à la fois."
    },
    {
      term: "ID client",
      description:
        "Valeur d'identification attribuée à votre application après l'enregistrement. Cette valeur est utilisée conjointement avec d'autres services tiers et figure dans **Auth0 Dashboard** > **Paramètres de l'application**."
    },
    {
      term: "Identité numérique",
      description: "Ensemble d'attributs qui définissent un utilisateur particulier dans le contexte d'une fonction assurée par une application donnée."
    },
    {
      term: "Jeton d'accès",
      description:
        "Identifiant qu'une application peut utiliser pour accéder à une API. Il indique à l'API que le porteur du jeton a été autorisé à y accéder et à effectuer des actions particulières définies par les permissions qui lui ont été accordées. Un jeton d'accès peut prendre n'importe quel format, mais les chaînes opaques et les jetons Web JSON (JWT) sont deux options courantes. Ils doivent être transmis à l'API en tant qu'identifiant porteur dans un en-tête d'autorisation HTTP."
    },
    {
      term: "Jeton d'actualisation",
      description:
        "Type particulier de jeton pouvant être utilisé pour obtenir un nouveau jeton d'accès. Il est utile pour renouveler les jetons d'accès arrivant à expiration sans obliger l'utilisateur à se reconnecter. Le jeton d'actualisation permet de demander un nouveau jeton d'accès à tout moment jusqu'à ce qu'il soit révoqué."
    },
    {
      term: "Jeton d'ID",
      description: "Identifiant conçu pour le client lui-même, et non pour l'accès à une ressource. Il a un format fixe que les clients peuvent analyser et valider."
    },
    {
      term: "Jeton de sécurité",
      description: "Artéfact signé numériquement utilisé pour prouver qu'un utilisateur a été authentifié avec succès."
    },
    {
      term: "Jeton Web JSON (JWT)",
      description:
        "Méthode ouverte, conforme à la norme industrielle RFC 7519, permettant de représenter en toute sécurité des demandes entre deux parties. Chez Auth0, les jetons d'ID sont toujours renvoyés au format JWT, tandis que les jetons d'accès le sont généralement aussi. Il est possible de décoder et d'afficher les demandes contenues dans un JWT bien formé sur le site JWT.io."
    },
    {
      term: "Limitation des adresses IP suspectes",
      description: "Cette mesure de sécurité protège votre locataire contre les tentatives de connexion suspectes provenant d'une seule adresse IP qui ciblent un grand nombre de comptes."
    },
    {
      term: "Localisation",
      description: "Possibilité de présenter l'interface de la nouvelle connexion universelle dans l'une des langues prises en charge."
    },
    {
      term: "Locataire",
      description:
        "Au sein d’Auth0, un groupe d’utilisateurs logiquement isolés qui partagent un accès commun à une instance logicielle unique et qui possèdent des privilèges particuliers. Chaque locataire est isolé, empêchant tout autre locataire d’accéder à ses données, même si plusieurs locataires peuvent fonctionner sur la même machine. Le terme « locataire », en général, est emprunté à l’architecture logicielle multilocataire."
    },
    {
      term: "Lock",
      description:
        "Gadget logiciel d’interface utilisateur pour l’authentification des utilisateurs par Auth0. Il est prêt à l’emploi et représente l’expérience de connexion universelle standard. Lock vous permet de personnaliser légèrement le comportement et l’apparence, mais son objectif principal est la simplicité d’utilisation."
    },
    {
      term: "Management API",
      description: "API d’Auth0 permettant de gérer les services Auth0 et d’effectuer des tâches administratives de façon programmatique."
    },
    {
      term: "Métadonnées",
      description:
        "Informations que les utilisateurs peuvent mettre à jour, telles que les préférences ou les paramètres de profil. Les métadonnées sont ajoutées aux jetons d’ID et peuvent être stockées dans les profils utilisateurs."
    },
    {
      term: "Migration",
      description:
        "Processus par lequel un client abandonne une fonctionnalité ou un comportement particulier. Les migrations devraient avoir lieu au cours de la phase de lancement du produit où celui-ci est déconseillé."
    },
    {
      term: "Nombre aléatoire",
      description:
        "Nombre arbitraire (souvent aléatoire ou pseudo-aléatoire) émis dans un protocole d’authentification qui peut être utilisé pour aider à détecter et atténuer les attaques par réinsertion utilisant d’anciennes communications. En d’autres termes, le nombre aléatoire n’est émis qu’une seule fois, de sorte que si un attaquant tente de rejouer une transaction avec un nombre aléatoire différent, sa fausse transaction peut être détectée plus facilement."
    },
    {
      term: "OAuth 2.0",
      description:
        "Cadre d'autorisation qui définit les protocoles d'autorisation et les flux. OAuth 2.0 définit les rôles, les octrois d'autorisation (ou flux), les demandes d'autorisation et les réponses, ainsi que la gestion des jetons. Les protocoles OpenID Connect (OIDC) pour vérifier l'identité de l'utilisateur étendent OAuth 2.0."
    },
    {
      term: "Obsolescence",
      description:
        "Phase de diffusion d’un produit indiquant que la fonctionnalité ou le comportement référencé n’est plus pris en charge pour les nouveaux abonnés, qu’il ne fait pas l’objet d’améliorations actives et qu’il ne fait l’objet que d’un entretien minimal. Les locataires utilisant la fonctionnalité ou le comportement au moment de l’obsolescence continueront d’y avoir accès."
    },
    {
      term: "OpenID",
      description:
        "Norme ouverte d'authentification qui permet aux applications de vérifier que les utilisateurs sont bien ceux qu'ils prétendent être sans avoir à collecter, stocker et donc être responsables des informations de connexion de l'utilisateur."
    },
    {
      term: "Organizations",
      description:
        "Produit Auth0 qui permet aux clients de commerce électronique interentreprises (C3E) de catégoriser les utilisateurs finaux et de définir des rôles particuliers, l’expérience de connexion et l’accès aux ressources."
    },
    {
      term: "Partie de confiance",
      description: "Entité (telle qu’un service ou une application) qui dépend d’un fournisseur d’identité tiers pour authentifier un utilisateur."
    },
    {
      term: "Périmètre",
      description:
        "Ensemble des limites qui englobent un répertoire, tous ses utilisateurs et toutes les applications qui utilisent ce répertoire. Dans certaines mises en œuvre, ce périmètre correspond à un emplacement physique; dans d'autres, il s'agit d'un ensemble de réseaux ou d'appareils connectés par VPN."
    },
    {
      term: "Permission",
      description:
        "Mécanisme qui définit les actions que les applications peuvent être autorisées à effectuer ou les informations qu'elles peuvent demander au nom d'un utilisateur. Souvent, les applications voudront utiliser des informations déjà créées dans une ressource en ligne. Dans ce cas, l'application devra demander l'autorisation d'accéder à ces informations au nom de l'utilisateur. Lorsqu'une application demande l'autorisation d'accéder à une ressource par l'intermédiaire d'un serveur d'autorisations, elle utilise le paramètre Permissions pour préciser l'accès dont elle a besoin, et le serveur d'autorisations utilise ce même paramètre pour répondre avec l'accès qui a été effectivement accordé."
    },
    {
      term: "Phases de lancement du produit",
      description:
        "Phases qui décrivent comment Auth0 implémente, diffuse et retire des fonctionnalités du produit. Les fonctionnalités du produit peuvent ne pas passer par toutes les phases de lancement, et la durée de chaque phase varie en fonction de la permission et de la portée de la fonctionnalité."
    },
    {
      term: "Point de terminaison de jeton",
      description: "Point de terminaison sur le serveur d’autorisations utilisé pour demander des jetons de manière programmatique."
    },
    {
      term: "Propriétaire de ressources",
      description: "Entité (telle qu’un utilisateur ou une application) capable d’accorder l’accès à une ressource protégée."
    },
    {
      term: "Protection contre les attaques",
      description:
        "Fonctionnalités offertes par Auth0 pour détecter et atténuer les attaques, notamment la protection contre les attaques par force brute, la limitation des IP suspectes, la détection des mots de passe frauduleux, la détection des robots et l’authentification multifacteur (MFA) adaptative."
    },
    {
      term: "Protection contre les attaques par force brute",
      description: "Forme de protection contre les attaques par force brute provenant d’une seule adresse IP et qui ciblent un seul compte d’utilisateur."
    },
    {
      term: "Rappel",
      description: "URL vers laquelle Auth0 envoie sa réponse après l’authentification. Il s’agit souvent de la même URL vers laquelle un utilisateur est redirigé après l’authentification."
    },
    {
      term: "Répertoire",
      description:
        "Référentiel centralisé d'utilisateurs (dont le plus connu est Active Directory) qui centralise les identifiants et les attributs, rendant inutile pour chaque application d'avoir sa propre configuration d'identité locale et son propre groupe d'utilisateurs. Permet l'authentification unique pour toutes les applications utilisant le même répertoire d'utilisateurs."
    },
    {
      term: "Rôle",
      description:
        "Aspect de l’identité d’un utilisateur qui lui est attribué pour indiquer le niveau d’accès qu’il doit avoir au système. Les rôles sont essentiellement des collections d’autorisations."
    },
    {
      term: "Rotation des jetons d’actualisation",
      description:
        "Stratégie consistant à remplacer fréquemment les jetons d’actualisation pour minimiser la vulnérabilité. Avec la rotation des jetons d’actualisation, chaque fois que votre application échange un jeton d’actualisation pour obtenir un nouveau jeton d’accès, Auth0 renvoie également un nouveau jeton d’actualisation."
    },
    {
      term: "Sans mot de passe",
      description:
        "Forme d'authentification où le premier facteur n'est pas un mot de passe. Il peut s'agir d'un mot de passe à usage unique reçu par courriel ou par SMS, d'une notification poussée ou d'un capteur biométrique. L'authentification sans mot de passe utilise des mots de passe à usage unique, de sorte que les utilisateurs sont moins exposés aux attaques typiques par mot de passe (p. ex., attaque par dictionnaire ou par bourrage d'identifiants) qu'avec les connexions traditionnelles par nom d'utilisateur/mot de passe."
    },
    {
      term: "Secret client",
      description:
        "Secret utilisé par un client (application) pour s'authentifier auprès du serveur d'autorisation; il ne doit être connu que du client et du serveur d'autorisation et doit être suffisamment aléatoire pour ne pas pouvoir être deviné."
    },
    {
      term: "Security Assertion Markup Language (SAML)",
      description: "Protocole normalisé basé sur XML permettant à deux parties d’échanger des informations d’authentification sans utiliser de mot de passe."
    },
    {
      term: "Serveur d’authentification",
      description:
        "Serveur qui confirme ou rejette l’identité d’un utilisateur. Un serveur d’authentification ne limite pas les actions ou les ressources disponibles pour l’utilisateur (bien qu’il puisse fournir un contexte à cette raison)."
    },
    {
      term: "Serveur d’autorisations :",
      description:
        "Serveur centralisé qui contribue à définir les limites de l’accès d’un utilisateur. Par exemple, votre serveur d’autorisations peut contrôler les données, les tâches et les fonctionnalités accessibles à un utilisateur. Un serveur d’autorisation ne sert pas à authentifier les utilisateurs. Cette tâche incombe au serveur d’authentification, qui est chargé de vérifier l’identité d’un utilisateur."
    },
    {
      term: "Serveur de ressources",
      description: "Serveur hébergeant des ressources protégées. Les serveurs de ressources traitent les requêtes pour des ressources sécurisées et y répondent."
    },
    {
      term: "Signature numérique",
      description: "Chaîne cryptée qui protège les bits d’un jeton contre la falsification. Si les bits sont modifiés ou altérés, la signature ne pourra plus être vérifiée et sera rejetée."
    },
    {
      term: "Témoin de session",
      description:
        "Entité émise par le logiciel médiateur après avoir établi que le jeton qu’il reçoit est signé, valide et provient d’une source de confiance (le fournisseur d’identité). Cette entité représente le fait qu’une authentification réussie a eu lieu avec le fournisseur d’identité. Ce témoin évite de devoir répéter continuellement ce processus avec les jetons, en permettant à l’utilisateur d’être considéré comme authentifié tant que le témoin est présent."
    },
    {
      term: "Tokenset",
      description:
        "Pour chaque connexion autorisée d'un utilisateur, comme Google ou Microsoft, Token Vault crée un conteneur sécurisé appelé tokenset. Un tokenset contient les jetons d'accès et d'actualisation nécessaires pour appeler les API de ce fournisseur externe au nom de l'utilisateur. Un tokenset stocke de manière sécurisée les jetons d'accès et d'actualisation sur le serveur d'autorisations Auth0."
    },
    {
      term: "Usurpation",
      description: "Scénario où un assaillant persuade un client ou un service de réaliser une tâche à sa place."
    },
    {
      term: "Web Service Federation (WS-Fed)",
      description:
        "Protocole de gestion des identités des utilisateurs entre les systèmes, les domaines et les fournisseurs d’identité. Ce protocole s’appuie sur WS-Trust pour établir une confiance et est principalement utilisé pour les produits Microsoft. Il définit des politiques sur la manière de partager les métadonnées de fédération. Developers * [Developer Hub](https://developer.auth0.com/resources) * [Code Samples and Guides](https://developer.auth0.com/resources/code-samples) * [Blog posts](https://auth0.com/blog/developers/) * [Videos](https://auth0.com/docs/videos) * [Identity Unlocked - Podcasts](https://identityunlocked.auth0.com/public/49/Identity,-Unlocked.--bed7fada) * [Zero Index Newsletter](https://developer.auth0.com/newsletter) Documentation * [Articles](https://auth0.com/docs/articles) * [Quickstarts](https://auth0.com/docs/quickstarts) * [APIs](https://auth0.com/docs/api) * [SDK Libraries](https://auth0.com/docs/libraries) * [Blog](https://auth0.com/blog/) * [Reports](https://auth0.com/resources/ebooks) * [Webinars](https://auth0.com/resources/webinars) Get Involved * [Forum](https://community.auth0.com/) * [Events](https://developer.auth0.com/events) * [Ambassador Program](https://auth0.com/ambassador-program) * [Auth0 Research Program](https://auth0.com/research-program) Company * [Our Customers](https://auth0.com/customers) * [Compliance - Ensuring privacy and security](https://auth0.com/security) * [Partners](https://auth0.com/partners) * [Careers We're hiring!](https://www.okta.com/company/careers/) * [Okta + Auth0](https://www.okta.com/okta-and-auth0/) Support Center * [Community](https://community.auth0.com/) * [Support](https://support.auth0.com/) * [Help](https://community.auth0.com/c/help/6) * [FAQs](https://community.auth0.com/c/faq/42) * [Auth0 Marketplace](https://marketplace.auth0.com) Learning * [Learn](https://auth0.com/learn) * [Intro to IAM (CIAM)](https://auth0.com/intro-to-iam) * [Blog](https://auth0.com/blog/) Platform * [Access Management](https://auth0.com/platform/access-management) * [Extensibility](https://auth0.com/platform/extensibility) * [Security](https://auth0.com/platform/login-security) * [User Management](https://auth0.com/platform/user-management) * [Authentication](https://auth0.com/platform/authentication) Features * [Universal Login](https://auth0.com/features/universal-login) * [Single Sign On](https://auth0.com/features/single-sign-on) * [Multifactor Authentication](https://auth0.com/features/multifactor-authentication) * [Actions](https://auth0.com/features/actions) * [Machine to Machine](https://auth0.com/features/machine-to-machine) * [Passwordless](https://auth0.com/features/passwordless) * [Breached Passwords](https://auth0.com/features/breached-passwords) © 2025 Okta, Inc. All Rights Reserved. [Status](https://status.auth0.com) • [Legal](https://www.okta.com/agreements/) • [Privacy](https://auth0.com/privacy) • [Terms](https://auth0.com/web-terms) • [Your Privacy Choices](https://auth0.com/your-privacy-choices)<Frame>![](https://cdn.auth0.com/website/footer/ccpa.svg)</Frame> [Status](https://status.auth0.com) • [Legal](https://www.okta.com/agreements/) • [Privacy](https://auth0.com/privacy) • [Terms](https://auth0.com/web-terms) • [Your Privacy Choices](https://auth0.com/your-privacy-choices)<Frame>![](https://cdn.auth0.com/website/footer/ccpa.svg)</Frame>"
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

export const GlossaryJA = () => {
  const GLOSSARY = [
    {
      term: "Adaptive Multifactor Authentication",
      description:
        "ログイン試行が信頼性の低いログインであると判断された場合にのみ、ユーザーに対してトリガーされる多要素認証（MFA）。Auth0はAdaptive MFAを使用して、正当なユーザーのログインエクスペリエンスを変えずに維持しながら、不正者に対してセキュリティを強化する必要がある場合にのみMFAをトリガーします。"
    },
    {
      term: "Auth0 Dashboard",
      description: "Auth0のプライマリ管理者インターフェイスで、アプリケーションまたはAPIを登録し、ユーザーストアまたは別のIDプロバイダーに接続して、Auth0サービスを構成できます。"
    },
    {
      term: "Fine-grained Authorization (FGA)",
      description: "個々のユーザーがアプリケーション内の特定のオブジェクトまたはリソースにアクセスできるようにするAuth0のSaaS製品。"
    },
    {
      term: "IDトークン",
      description: "リソースにアクセスするためのものではなく、クライアント自体を対象とした資格情報。クライアントが解析および検証できる固定形式です。"
    },
    {
      term: "IDプロバイダー (IdP)",
      description:
        "デジタルIDを保存および管理するサービス。Auth0は、信頼できるソーシャルIDプロバイダー、エンタープライズIDプロバイダー、および法的IDプロバイダーをサポートしています。Auth0は、アプリケーションのIDプロバイダーとしても機能します。"
    },
    {
      term: "JSON Web Token (JWT)",
      description:
        "二者間のクレームを安全に表現するための、オープンかつ業界標準のRFC 7519方法。Auth0では、IDトークンは常にJWT形式で返され、アクセストークンも多くの場合、JWT形式で返されます。JWT.ioで整形式のJWTをデコードして、クレームを表示できます。"
    },
    {
      term: "Lock",
      description:
        "ユーザーを認証するためのAuth0のUIウィジェット。これはそのまま使用でき、クラシックユニバーサルログインエクスペリエンスのデフォルトの顔です。Lockを使用すると、細かい動作や外観のオプションをカスタマイズできますが、その主な目的は使いやすさです。"
    },
    {
      term: "Management API",
      description: "Auth0サービスを管理し、プログラムに従って管理タスクを実行するためのAuth0のAPI。"
    },
    {
      term: "Nonce",
      description:
        "認証プロトコルで発行される任意の数値（多くの場合、乱数または擬似乱数）で、旧式の通信を使用したリプレイ攻撃の検出と軽減に使用できます。nonceは1回しか発行されないため、攻撃者が別のnonceを使用してトランザクションを再実行しようとすると、その誤ったトランザクションをより簡単に検出できます。"
    },
    {
      term: "OAuth 2.0",
      description:
        "認可プロトコルとワークフローを定義する認可フレームワーク。OAuth 2.0は、ロール、認可付与（またはワークフロー）、認可要求と応答、およびトークン処理を定義します。ユーザーIDを検証するOpenID Connect（OIDC）プロトコルによって、OAuth 2.0を拡張できます。"
    },
    {
      term: "OpenID",
      description:
        "アプリケーションがユーザーのログイン情報を収集および保存することなく（したがって、ユーザーのログイン情報について責任を負わずに）、ユーザーが本人であることを確認できる認証用のオープン標準。"
    },
    {
      term: "Organization",
      description: "B2B顧客がエンドユーザーを分類し、特定のロール、ログインエクスペリエンス、およびリソースへのアクセスを定義できるようにするAuth0製品。"
    },
    {
      term: "Security Assertion Markup Language (SAML)",
      description: "パスワードを使用せずに二者間で認証情報を交換できるXMLベースの標準化プロトコル。"
    },
    {
      term: "Tokenset",
      description:
        "Pour chaque connexion autorisée d'un utilisateur, comme Google ou Microsoft, Token Vault crée un conteneur sécurisé appelé tokenset. Un tokenset contient les jetons d'accès et les jetons de rafraîchissement nécessaires pour appeler les API de ce fournisseur externe au nom de l'utilisateur. Un tokenset stocke de manière sécurisée les jetons d'accès et les jetons de rafraîchissement sur le serveur d'autorisation Auth0."
    },
    {
      term: "Webサービスフェデレーション (WS-Fed)",
      description:
        "WS-Trustを使用して信頼が確立されているシステム、ドメイン、およびIDプロバイダーの間でユーザーIDを管理するためのプロトコル。このプロトコルは主にMicrosoft製品に使用され、フェデレーションメタデータの共有方法に関するポリシーを定義します。"
    },
    {
      term: "アカウントリンク",
      description: "資格情報を1回提供するだけで、ユーザーが複数のリソースやアプリケーションにアクセスできるように、複数のプラットフォーム間でユーザーアカウントを接続すること。"
    },
    {
      term: "アクション",
      description:
        "Auth0実行中の特定の時点で実行される、Node.jsで記述された安全な関数。これはテナント固有であり、バージョン管理されています。アクションは、カスタムロジックでAuth0の機能をカスタマイズおよび拡張するために使用されます。"
    },
    {
      term: "アクセストークン",
      description:
        "アプリケーションがAPIにアクセスするために使用できる資格情報。これは、トークンのベアラーがAPIにアクセスし、付与されたスコープで指定された特定のアクションを実行する許可を得ていることをAPIに通知します。アクセストークンは任意の形式にできますが、一般的な2つのオプションとして、不透明な文字列とJSON Webトークン（JWT）があります。これらは、HTTP認可ヘッダー内のBearer資格情報としてAPIに送信される必要があります。"
    },
    {
      term: "アプリケーション",
      description: "認証とID管理を行うためにAuth0に依存するソフトウェア。Auth0は、シングルページ、通常のWeb、ネイティブ、およびマシンツーマシンのアプリケーションをサポートしています。"
    },
    {
      term: "オーディエンス",
      description:
        "発行されたトークンに対するオーディエンスを表す一意の識別子で、JSON Webトークン内でaudクレームとして特定されたもの。オーディエンス値は、IDトークンの場合はアプリケーション（Client ID）、アクセストークンの場合は呼び出されるAPI（API Identifier）のいずれかです。Auth0では、アクセストークンの要求で送信されるオーディエンス値によって、トークンが不透明形式で返されるかJWT形式で返されるかが決まります。"
    },
    {
      term: "カスタムドメイン",
      description: "特殊な名前、またはバニティ名を持つサードパーティのドメイン。CNAMEとも呼ばれます。"
    },
    {
      term: "クライアントID",
      description: "登録後にアプリケーションに割り当てられる識別値。この値は他のサードパーティーサービスと組み合わせて使用され、Auth0 Dashboard > Application Settingsで確認できます。"
    },
    {
      term: "クライアントシークレット",
      description:
        "Secret utilisé par le client (application) pour s'authentifier auprès du serveur d'autorisation. Seuls le client et le serveur d'autorisation le connaissent, et il doit être suffisamment aléatoire pour ne pas pouvoir être deviné."
    },
    {
      term: "クレーム",
      description: "Attributs regroupés dans un jeton de sécurité, représentant les affirmations que le fournisseur du jeton fait à propos d'une entité."
    },
    {
      term: "グループ",
      description: "Ensemble d'un ou plusieurs utilisateurs. Dans l'extension d'autorisation Auth0, les groupes permettent d'accorder l'accès à de nombreux utilisateurs à la fois."
    },
    {
      term: "コールバック",
      description: "URL à laquelle Auth0 envoie la réponse après l'authentification. Il s'agit souvent de la même URL vers laquelle l'utilisateur est redirigé une fois l'authentification terminée."
    },
    {
      term: "サブスクリプション",
      description: "Contrat définissant les fonctionnalités et les quotas disponibles pour chaque tenant. Auth0 propose plusieurs niveaux d'abonnement pour répondre aux besoins variés des développeurs et des organisations."
    },
    {
      term: "サポート終了",
      description:
        "Étape du cycle de vie d'un produit indiquant qu'une fonctionnalité ou un comportement sera retiré de la plateforme. Continuer à utiliser cette fonctionnalité ou ce comportement entraînera probablement des erreurs. Le nouveau comportement sera automatiquement activé pour les tenants qui n'ont pas opté pour la migration pendant la période de transition."
    },
    {
      term: "サポート終了日",
      description: "Date à laquelle l'accès à une fonctionnalité ou à un comportement est retiré de la plateforme. La date de fin de soutien peut varier selon le type de plan."
    },
    {
      term: "シャドーアカウント",
      description:
        "Méthode difficile à maintenir qui consiste à approvisionner manuellement, un par un, les utilisateurs devant accéder à une application distante depuis un répertoire local vers un répertoire distant (créant ainsi une copie, ou « ombre », du compte d'origine)."
    },
    {
      term: "シングルサインオン（SSO）",
      description:
        "Service qui connecte automatiquement un utilisateur à d'autres applications après qu'il s'est connecté à une première, peu importe la plateforme, la technologie ou le domaine utilisé. L'utilisateur ne se connecte qu'une seule fois (d'où le nom de cette fonctionnalité). De même, la déconnexion unique (SLO) se produit lorsqu'un utilisateur se déconnecte d'une application et est automatiquement déconnecté de chaque application ou service auquel il était connecté. Le SSO et le SLO sont rendus possibles grâce aux sessions."
    },
    {
      term: "スコープ",
      description:
        "Mécanisme définissant les actions spécifiques qu'une application peut effectuer ou les informations qu'elle peut demander au nom d'un utilisateur. Souvent, une application cherche à exploiter des informations déjà disponibles dans des ressources en ligne. Pour ce faire, elle doit demander l'autorisation d'accéder à ces informations au nom de l'utilisateur. Lorsqu'une application demande l'accès à une ressource via un serveur d'autorisation, elle utilise le paramètre de portée pour préciser l'accès requis, et le serveur d'autorisation répond avec le paramètre de portée indiquant l'accès effectivement accordé."
    },
    {
      term: "セキュリティトークン",
      description: "Artefact signé numériquement utilisé pour prouver qu'un utilisateur a été authentifié avec succès."
    },
    {
      term: "セッションクッキー",
      description:
        "Entité émise par le middleware après qu'il a vérifié que le jeton reçu est signé, valide et provient d'une source fiable (le fournisseur d'identité). Cette entité atteste que l'authentification par le fournisseur d'identité a réussi. Tant que le cookie existe, l'utilisateur est considéré comme authentifié, ce qui évite de devoir répéter continuellement ce processus à l'aide de jetons."
    },
    {
      term: "ディレクトリ",
      description:
        "Référentiel central d'utilisateurs (dont le plus connu est Active Directory). Il permet de gérer les informations d'identification et les attributs de manière centralisée, évitant ainsi à chaque application de maintenir sa propre configuration d'identité locale et son propre bassin d'utilisateurs. L'authentification unique est possible pour toutes les applications qui utilisent le même répertoire d'utilisateurs."
    },
    {
      term: "デジタルID",
      description: "Ensemble d'attributs définissant un utilisateur particulier dans le contexte des fonctionnalités offertes par une application donnée."
    },
    {
      term: "デジタル署名",
      description: "Chaîne chiffrée protégeant les informations contenues dans un jeton contre toute falsification. Si ces informations sont modifiées ou altérées, la signature ne peut plus être vérifiée et est rejetée."
    },
    {
      term: "テナント",
      description:
        "Dans Auth0, groupe d'utilisateurs logiquement isolé partageant un accès privilégié à une seule instance logicielle. Même lorsque plusieurs tenants s'exécutent sur la même machine, l'un d'eux ne peut pas accéder aux données d'un autre. De manière générale, le terme « tenant » est emprunté à l'architecture logicielle multi-locataire."
    },
    {
      term: "トークンエンドポイント",
      description: "Point de terminaison sur le serveur d'autorisation utilisé pour demander des jetons de manière programmatique."
    },
    {
      term: "トリガー",
      description:
        "Événement qui invoque automatiquement une action lorsqu'une opération spécifique se produit à l'exécution, comme la connexion d'un utilisateur. Certains déclencheurs s'exécutent en parallèle et bloquent le flux concerné, tandis que d'autres ne s'exécutent pas de façon simultanée."
    },
    {
      term: "パスワードレス",
      description:
        "Forme d'authentification où le premier facteur n'est pas un mot de passe. À la place, un mot de passe à usage unique reçu par courriel, par SMS, par notification push ou via un capteur biométrique peut être utilisé. Comme l'authentification sans mot de passe repose sur des mots de passe à usage unique, les utilisateurs sont moins vulnérables aux attaques courantes basées sur les mots de passe (comme les attaques par dictionnaire ou le bourrage d'informations d'identification) comparativement à la connexion traditionnelle par nom d'utilisateur et mot de passe."
    },
    {
      term: "パスワード漏洩検知",
      description: "Forme de protection contre les attaques par laquelle Auth0 avertit les utilisateurs lorsqu'ils utilisent une combinaison nom d'utilisateur et mot de passe compromise lors d'une fuite de données sur un site Web ou une application tierce."
    },
    {
      term: "パブリッククライアント",
      description:
        "Selon le protocole OAuth 2.0, les clients (applications) peuvent être classés comme confidentiels ou publics selon leur capacité à conserver leurs informations d'identification (comme un ID client et un secret) de manière sécurisée. Les clients publics ne pouvant pas conserver leurs informations d'identification de façon sécurisée, ils doivent uniquement utiliser des types d'octroi qui ne nécessitent pas l'utilisation d'un secret client. Les jetons d'identité émis pour les clients publics doivent être signés de manière asymétrique à l'aide d'une clé privée (RS256) et validés à l'aide de la clé publique correspondant à la clé privée ayant servi à signer le jeton."
    },
    {
      term: "Flux",
      description: "Un processus pouvant être étendu à l'aide d'actions. Chaque flux est composé d'un ou de plusieurs déclencheurs et représente un pipeline logique par lequel l'information transite à un point précis du processus Auth0."
    },
    {
      term: "Version bêta",
      description:
        "Étape de lancement d'un produit précédant la disponibilité générale (DG), au cours de laquelle la fonctionnalité ou le comportement visé est mis à la disposition des abonnés afin de leur permettre d'évaluer et d'adopter les nouvelles fonctionnalités tout en fournissant leurs derniers commentaires. Sur le plan fonctionnel, le code est complet, stable et utile dans divers scénarios, et est considéré comme répondant aux attentes de qualité de la version DG, ou presque. Une version bêta peut être limitée à un petit groupe d'abonnés sélectionnés (privée) ou offerte à tous les abonnés (publique)."
    },
    {
      term: "Détection de robots",
      description: "Une forme de protection contre les attaques par laquelle Auth0 active un CAPTCHA pendant le processus de connexion afin de bloquer le trafic de robots suspects."
    },
    {
      term: "Métadonnées",
      description: "Informations pouvant être mises à jour par l'utilisateur, telles que les préférences et les paramètres de profil. Les métadonnées peuvent être ajoutées aux jetons d'identité et enregistrées dans le profil utilisateur."
    },
    {
      term: "Blocage/déblocage d'utilisateur",
      description:
        "Action de supprimer ou de rétablir l'accès à une ressource demandée. Fait référence aux fonctionnalités de la suite de protection contre les attaques d'Auth0 (détection des mots de passe compromis, protection contre les attaques par force brute, limitation des IP suspectes). Chaque service évalue les tendances de connexion et d'inscription, et bloque les adresses IP associées à des activités suspectes."
    },
    {
      term: "Universal Login",
      description:
        "L'implémentation du flux d'authentification par Auth0, qui constitue la fonctionnalité principale du serveur d'autorisation. Chaque fois qu'une preuve d'identité est requise, l'application est redirigée vers Universal Login, et Auth0 effectue les opérations nécessaires pour garantir l'identité de l'utilisateur."
    },
    {
      term: "Serveur de ressources",
      description: "Serveur hébergeant des ressources protégées. Le serveur de ressources accepte les demandes de ressources protégées et y répond."
    },
    {
      term: "Propriétaire de ressource",
      description: "Entité (comme un utilisateur ou une application) pouvant accorder l'accès à une ressource protégée."
    },
    {
      term: "Refresh Token",
      description:
        "Jeton spécial pouvant être utilisé pour obtenir un nouveau jeton d'accès. Il est utile pour renouveler des jetons d'accès arrivant à expiration sans obliger l'utilisateur à se reconnecter. L'utilisation d'un Refresh Token permet de demander un nouveau jeton d'accès à tout moment, jusqu'à ce que le Refresh Token soit inscrit sur la liste de blocage."
    },
    {
      term: "Rotation des Refresh Tokens",
      description:
        "Stratégie consistant à remplacer fréquemment les refresh tokens afin de minimiser les vulnérabilités. Avec la rotation des refresh tokens, chaque fois qu'une application échange un refresh token pour obtenir un nouveau jeton d'accès, Auth0 retourne également un nouveau refresh token."
    },
    {
      term: "Localisation",
      description: "Fonctionnalité permettant d'afficher la nouvelle expérience Universal Login dans les langues prises en charge."
    },
    {
      term: "Rôle",
      description: "Aspect de l'identité d'un utilisateur qui lui est attribué et qui indique le niveau d'accès dont il a besoin dans le système. Un rôle est essentiellement un ensemble de permissions."
    },
    {
      term: "Disponibilité générale",
      description:
        "Étape de lancement d'un produit au cours de laquelle la fonctionnalité ou le comportement visé est entièrement opérationnel et disponible en production pour tous les abonnés (sous réserve des restrictions liées au niveau tarifaire). Lorsqu'une nouvelle version remplace une fonctionnalité existante, Auth0 informe les clients et prévoit une période de rétrocompatibilité conformément à sa politique de dépréciation, afin de leur laisser le temps d'adopter la nouvelle version."
    },
    {
      term: "Limitation des IP suspectes",
      description: "Forme de protection contre les attaques qui protège le tenant contre les connexions suspectes provenant d'une seule adresse IP ciblant un très grand nombre de comptes."
    },
    {
      term: "Acteur malveillant",
      description:
        "Également appelé acteur de menace. Entité (individu ou groupe) qui représente une menace pour une entreprise ou un environnement avec l'intention de causer des dommages. Les préjudices peuvent inclure des dommages physiques et cybernétiques, allant de l'intrusion dans des centres de données au piratage de systèmes à l'aide d'informations d'identification volées."
    },
    {
      term: "Confiance",
      description: "Lorsqu'une ressource accepte comme véridique ce qu'un fournisseur d'identité ou une autorité de certification affirme à propos d'un utilisateur, on dit que cette ressource fait confiance à ce fournisseur d'identité ou à cette autorité de certification."
    },
    {
      term: "Périmètre",
      description:
        "Ensemble de limites entourant un répertoire, tous ses utilisateurs et toutes les applications qui l'utilisent. Dans certaines implémentations, ce périmètre désigne un emplacement physique. Il peut également faire référence à un ensemble de réseaux ou d'appareils connectés via un VPN."
    },
    {
      term: "Authentification multifacteur (MFA)",
      description:
        "Processus d'authentification tenant compte de plusieurs facteurs. Dans Auth0, le premier facteur est généralement l'échange standard nom d'utilisateur/mot de passe, et le deuxième facteur peut être un code ou un lien envoyé par courriel ou SMS, un mot de passe à usage unique via une application comme Authy ou Google Authenticator, ou encore une notification push via une application téléphonique comme Guardian ou Duo. L'utilisation de plusieurs facteurs permet de maintenir la sécurité d'un compte même si l'un des facteurs est compromis, par exemple si un mot de passe tombe entre de mauvaises mains ou si un téléphone est volé."
    },
    {
      term: "Dépréciation",
      description:
        "Phase de lancement d'un produit indiquant que la fonctionnalité ou le comportement en question n'est pas disponible pour les nouveaux abonnés, ne fait pas l'objet d'améliorations actives et ne bénéficie que d'une maintenance minimale. Les locataires qui utilisaient cette fonctionnalité ou ce comportement au moment de la dépréciation peuvent continuer à y accéder."
    },
    {
      term: "Connexion",
      description: "La relation entre Auth0 et la source des utilisateurs d'une application. Les exemples incluent les fournisseurs d'identité (comme Google ou Active Directory), les méthodes d'authentification sans mot de passe et les bases de données d'utilisateurs."
    },
    {
      term: "Protection contre les attaques",
      description: "Les fonctionnalités offertes par Auth0 pour détecter et atténuer les attaques, notamment la protection contre les attaques par force brute, la limitation des adresses IP suspectes, la détection des mots de passe compromis, la détection des robots et l'authentification multifacteur adaptative."
    },
    {
      term: "Accès anticipé",
      description:
        "Phase de lancement d'un produit où la fonctionnalité ou le comportement en question est mis à la disposition d'un nombre limité d'abonnés ou de partenaires de développement client (CDP), afin que ces abonnés ou CDP puissent effectuer des tests et fournir des commentaires sur les fonctionnalités à venir. À cette étape, la fonctionnalité peut ne pas être finalisée, mais elle peut être validée."
    },
    {
      term: "Informations d'identification brutes",
      description: "Un secret partagé ou un ensemble d'informations convenus entre un utilisateur et une ressource, permettant à la ressource de vérifier l'identité de l'utilisateur."
    },
    {
      term: "Client confidentiel",
      description:
        "Selon le protocole OAuth 2.0, les clients (applications) peuvent être classés comme confidentiels ou publics selon leur capacité à conserver leurs informations d'identification (comme un ID client et un secret) de manière sécurisée. Les clients confidentiels peuvent conserver leurs informations d'identification de façon sécurisée sans les exposer à des parties non autorisées, ce qui nécessite un serveur dorsal de confiance. Ces clients peuvent utiliser des types d'octroi qui exigent qu'ils s'authentifient en fournissant leur ID client et leur secret lors de l'appel au point de terminaison de jeton, et peuvent se faire émettre des jetons signés de manière symétrique ou asymétrique."
    },
    {
      term: "Appareil de consommation",
      description: "Dans le flux d'authentification par canal arrière initié par le client, l'appareil qui aide l'utilisateur à utiliser le service."
    },
    {
      term: "Confused deputy",
      description: "Une situation dans laquelle un attaquant trompe un client ou un service pour lui faire exécuter une action."
    },
    {
      term: "Changement radical",
      description: "À la connaissance d'Auth0, une modification apportée à la plateforme Auth0 qui perturbe l'interopérabilité entre la plateforme Auth0 et les applications des clients."
    },
    {
      term: "Migration",
      description: "Le processus par lequel un client s'éloigne d'une fonctionnalité ou d'un comportement particulier. La migration doit être effectuée lors de la phase de dépréciation du lancement du produit."
    },
    {
      term: "Protection contre les attaques par force brute",
      description: "Une forme de protection contre les attaques qui protège contre les attaques par force brute provenant d'une seule adresse IP et ciblant un seul compte utilisateur."
    },
    {
      term: "Algorithme de signature",
      description: "Un algorithme de hachage utilisé pour signer numériquement les jetons afin d'empêcher leur falsification par des parties non autorisées."
    },
    {
      term: "Phase de lancement du produit",
      description:
        "Les phases qui décrivent la façon dont Auth0 planifie, lance et déprécie les fonctionnalités du produit. Les fonctionnalités du produit ne passent pas nécessairement par toutes les phases de lancement, et la durée de chaque phase varie selon la portée et l'impact de la fonctionnalité."
    },
    {
      term: "Partie utilisatrice",
      description: "Une entité (comme un service ou une application) qui s'appuie sur un fournisseur d'identité tiers pour authentifier les utilisateurs."
    },
    {
      term: "Code d'autorisation",
      description:
        "Une chaîne aléatoire générée par le serveur d'autorisation et renvoyée à l'application dans le cadre de la réponse d'autorisation. Le code d'autorisation a une durée de vie relativement courte et est échangé contre un jeton d'accès au point de terminaison de jeton lors de l'utilisation du flux de code d'autorisation (avec ou sans Proof Key for Code Exchange (PKCE))."
    },
    {
      term: "Serveur d'autorisation",
      description:
        "Un serveur centralisé utilisé pour définir les limites d'accès des utilisateurs. Par exemple, un serveur d'autorisation peut contrôler les données, les tâches et les fonctionnalités auxquelles un utilisateur a accès. Le serveur d'autorisation n'authentifie pas les utilisateurs — c'est le rôle du serveur d'authentification de vérifier l'identité des utilisateurs."
    },
    {
      term: "Flux d'autorisation",
      description:
        "Un autre nom pour les octrois d'autorisation décrits dans OAuth 2.0. Le flux d'autorisation est le flux de travail qu'une ressource (application ou API) utilise pour accorder l'accès à un demandeur. Selon le type de technologie (par exemple, si l'application peut stocker un secret client) et le type de demandeur, le propriétaire de la ressource peut utiliser le flux de code d'autorisation, Proof of Key Code Exchange (PKCE), Resource Owner Password Credential (ROPG), le flux implicite ou les informations d'identification du client."
    },
    {
      term: "Serveur d'authentification",
      description:
        "Un serveur qui confirme ou refuse l'identité d'un utilisateur. Le serveur d'authentification ne limite pas les actions ou les ressources auxquelles un utilisateur a accès (bien qu'il puisse fournir du contexte à cette fin)."
    },
    {
      term: "Appareil d'authentification",
      description: "Dans le flux d'authentification par canal arrière initié par le client."
    }
  ]

  // All A-Z letters + dynamically extracted unique Japanese characters
  const ENGLISH_LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
  const uniqueJapaneseChars = [
    ...new Set(
      GLOSSARY.map((item) => item.term[0] || "")
        .filter((char) => !/[A-Z]/i.test(char))
        .map((char) => char.toUpperCase())
    )
  ].sort((a, b) => a.localeCompare(b, "ja"))
  const A_TO_Z = [...ENGLISH_LETTERS, ...uniqueJapaneseChars]

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