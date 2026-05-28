export const GlossaryPage = () => {
  const GLOSSARY = [
    {
      term: "Access Token",
      description:
        "Credencial que una aplicación puede usar para acceder a una API. Informa a la API que el portador del token ha sido autorizado para acceder a ella y realizar las acciones específicas definidas por el scope otorgado. Un Token de acceso puede estar en cualquier formato, aunque dos opciones habituales son las cadenas opacas y los JSON Web Tokens (JWT). Deben transmitirse a la API como credencial Bearer en un encabezado HTTP Authorization."
    },
    {
      term: "Account Linking",
      description: "Vinculación de cuentas de usuario en múltiples plataformas para permitir a los usuarios acceder a más de un recurso o aplicación proporcionando sus credenciales una sola vez."
    },
    {
      term: "Actions",
      description:
        "Funciones seguras, específicas del tenant y con control de versiones, escritas en Node.js, que se ejecutan en determinados puntos durante el tiempo de ejecución de Auth0. Las Actions se utilizan para personalizar y ampliar las capacidades de Auth0 con lógica personalizada."
    },
    {
      term: "Adaptive Multi-factor Authentication",
      description:
        "Autenticación multifactor (MFA) que solo se activa cuando se determina que un intento de inicio de sesión es de baja confianza. Con la MFA adaptativa, Auth0 activa la MFA únicamente cuando es necesario para añadir fricción a los actores maliciosos, sin alterar la experiencia de inicio de sesión de los usuarios legítimos."
    },
    {
      term: "Application",
      description: "El software que utiliza Auth0 para la autenticación y la gestión de identidades. Auth0 admite aplicaciones de página única, web tradicionales, nativas y de máquina a máquina."
    },
    {
      term: "Attack Protection",
      description:
        "Funcionalidades que Auth0 ofrece para detectar y mitigar ataques, entre ellas: protección contra ataques de fuerza bruta, limitación de IPs sospechosas, detección de contraseñas comprometidas, detección de bots y autenticación multifactor adaptativa."
    },
    {
      term: "Audience",
      description:
        "Identificador único de la audiencia para un token emitido, identificado dentro de un JSON Web Token como el claim aud. El valor de la audiencia es la aplicación (ID de cliente) para un ID Token, o la API que se está invocando (identificador de API) para un Token de acceso. En Auth0, el valor de Audiencia enviado en una solicitud de Token de acceso determina si dicho token se devuelve en formato opaco o JWT."
    },
    {
      term: "Auth0 Dashboard",
      description: "La interfaz de administración principal de Auth0, desde la que puede registrar su aplicación o API, conectarse a un almacén de usuarios u otro proveedor de identidad, y configurar sus servicios de Auth0."
    },
    {
      term: "Authentication Device",
      description: "El dispositivo en el que el usuario se autenticará y otorgará su consentimiento en el flujo de autenticación de backchannel iniciado por el cliente."
    },
    {
      term: "Authentication Server",
      description:
        "Servidor que confirma o deniega la identidad de un usuario. Un servidor de autenticación no limita las acciones ni los recursos disponibles para el usuario (aunque puede proporcionar contexto con ese fin)."
    },
    {
      term: "Authorization Code",
      description:
        "Cadena aleatoria generada por el servidor de autorización y devuelta a la aplicación como parte de la respuesta de autorización. El código de autorización tiene una vida útil relativamente corta y se intercambia por un Token de acceso en el endpoint de token al usar el flujo de código de autorización (con o sin Proof Key for Code Exchange (PKCE))."
    },
    {
      term: "Authorization Flow",
      description:
        "Otro nombre para las concesiones de autorización definidas en OAuth 2.0. Los flujos de autorización son los flujos de trabajo que un recurso (una aplicación o una AIP) utiliza para otorgar acceso a los solicitantes. Según el tipo de tecnología y el tipo de solicitante, los propietarios de recursos pueden usar el flujo de código de autorización, PKCE, ROPG, implícito o credenciales de cliente."
    },
    {
      term: "Authorization Server",
      description:
        "Servidor centralizado que contribuye a definir los límites del acceso de un usuario. Por ejemplo, el servidor de autorización puede controlar los datos, las tareas y las funcionalidades disponibles para un usuario. Un servidor de autorización no autentica usuarios; verificar la identidad del usuario es responsabilidad del servidor de autenticación."
    },
    {
      term: "Bad Actors",
      description:
        "También conocidos como actores de amenaza. Entidad (una persona o grupo) que representa una amenaza para el negocio o el entorno con la intención de causar daño. El daño puede ser físico o cibernético, desde irrumpir en un centro de datos hasta comprometer sistemas con credenciales robadas."
    },
    {
      term: "Beta",
      description:
        "Etapa de lanzamiento de producto durante la cual la funcionalidad o el comportamiento referenciado se pone a disposición de los suscriptores para que puedan explorar y adoptar las nuevas capacidades del producto, a la vez que proporcionan comentarios finales antes de un lanzamiento GA. La funcionalidad está completa en código, es estable, útil en una variedad de escenarios y se considera que cumple o casi cumple las expectativas de calidad para un lanzamiento GA. Los lanzamientos Beta pueden ser privados o públicos."
    },
    {
      term: "Block/Unblock Users",
      description:
        "Eliminación o restauración del acceso de un solicitante a un recurso. Hace referencia a las funcionalidades del conjunto de protección contra ataques de Auth0. Cada servicio evalúa las tendencias de inicio de sesión y registro, y bloquea las direcciones IP asociadas con actividad sospechosa."
    },
    {
      term: "Bot Detection",
      description: "Forma de protección contra ataques en la que Auth0 bloquea el tráfico sospechoso de bots habilitando un CAPTCHA durante el proceso de inicio de sesión."
    },
    {
      term: "Breached Password Detection",
      description: "Forma de protección contra ataques en la que Auth0 notifica a sus usuarios si utilizan una combinación de nombre de usuario y contraseña que ha sido comprometida en una filtración de datos en un sitio web o aplicación de terceros."
    },
    {
      term: "Breaking Change",
      description: "Cambio en la plataforma Auth0 que, según el conocimiento de Auth0, causará fallos en la interoperación entre la plataforma Auth0 y las aplicaciones de los clientes."
    },
    {
      term: "Brute-force Protection",
      description: "Forma de protección contra ataques que protege frente a ataques de fuerza bruta originados desde una única dirección IP y dirigidos a una única cuenta de usuario."
    },
    {
      term: "Callback",
      description: "URL a la que Auth0 envía su respuesta tras la autenticación. Suele ser la misma URL a la que se redirige al usuario después de autenticarse."
    },
    {
      term: "Claim",
      description: "Atributo incluido en un token de seguridad que representa una afirmación que el emisor del token hace sobre una entidad."
    },
    {
      term: "Client ID",
      description:
        "Valor de identificación asignado a su aplicación tras el registro. Este valor se utiliza junto con otros servicios de terceros y puede encontrarse en Auth0 Dashboard > Configuración de la aplicación."
    },
    {
      term: "Client Secret",
      description:
        "Secreto utilizado por un cliente (aplicación) para autenticarse ante el Servidor de autorización; solo debe ser conocido por el cliente y el Servidor de autorización, y debe ser suficientemente aleatorio para no poder adivinarse."
    },
    {
      term: "Confidential Client",
      description:
        "Según el protocolo OAuth 2.0, los clientes (aplicaciones) pueden clasificarse como confidenciales o públicos. Los clientes confidenciales pueden almacenar credenciales de forma segura y requieren un servidor backend de confianza para ello. Pueden usar tipos de concesión que requieren autenticación especificando su ID de cliente y secreto al llamar al endpoint de token."
    },
    {
      term: "Confused Deputy",
      description: "Situación en la que un atacante engaña a un cliente o servicio para que realice una acción en su nombre."
    },
    {
      term: "Connection",
      description: "Relación entre Auth0 y las fuentes de usuarios para sus aplicaciones. Entre los ejemplos se incluyen proveedores de identidad, métodos de autenticación sin contraseña y bases de datos de usuarios."
    },
    {
      term: "Consumption Device",
      description: "El dispositivo que ayuda al usuario a consumir un servicio en el flujo de autenticación de backchannel iniciado por el cliente."
    },
    {
      term: "Custom Domain",
      description: "Dominio de terceros con un nombre personalizado o de vanidad. También conocido como CNAME."
    },
    {
      term: "Deprecation",
      description:
        "Etapa de lanzamiento de producto que indica que la funcionalidad o el comportamiento referenciado no está disponible para nuevos suscriptores, no se está mejorando activamente y solo recibe un mantenimiento mínimo."
    },
    {
      term: "Digital Identity",
      description: "Conjunto de atributos que definen a un usuario concreto en el contexto de una función proporcionada por una aplicación específica."
    },
    {
      term: "Digital Signature",
      description:
        "Cadena cifrada que protege los bits de un token frente a manipulaciones. Si los bits son modificados o alterados, la firma no podrá verificarse y el token será rechazado."
    },
    {
      term: "Directory",
      description:
        "Repositorio centralizado de usuarios (el más conocido es Active Directory) que centraliza credenciales y atributos, eliminando la necesidad de que cada aplicación tenga su propia configuración de identidad local."
    },
    {
      term: "Early Access",
      description:
        "Etapa de lanzamiento de producto durante la cual la funcionalidad o el comportamiento referenciado se pone a disposición de un número limitado de suscriptores o socios de desarrollo de clientes (CDPs) para que lo prueben y aporten comentarios."
    },
    {
      term: "End of Life",
      description: "Etapa de lanzamiento del producto que indica que la función o el comportamiento referenciado ha sido eliminado de la plataforma. El uso continuado probablemente generará errores."
    },
    {
      term: "End of Life Date",
      description: "Fecha en la que el acceso a una función o comportamiento es eliminado de la plataforma. Las fechas de fin de vida pueden variar según el tipo de plan."
    },
    {
      term: "Fine-grained Authorization (FGA)",
      description: "Producto SaaS de Auth0 que otorga a usuarios individuales acceso a objetos o recursos específicos dentro de tu aplicación."
    },
    {
      term: "Flow",
      description:
        "Procesos que pueden extenderse mediante Actions. Cada Flow está compuesto por uno o más Triggers y representa el flujo lógico a través del cual se mueve la información en un punto determinado del recorrido de Auth0."
    },
    {
      term: "General Availability",
      description: "Etapa de lanzamiento del producto en la que la función o el comportamiento referenciado es completamente funcional y está disponible para todos los suscriptores en entornos de producción."
    },
    {
      term: "Group",
      description: "Conjunto de uno o más usuarios. En la extensión de autorización de Auth0, se utilizan grupos para otorgar acceso a múltiples usuarios a la vez."
    },
    {
      term: "ID Token",
      description: "Credencial destinada al propio cliente, no para acceder a un recurso. Tiene un formato fijo que los clientes pueden analizar y validar."
    },
    {
      term: "Identity Provider (IdP)",
      description: "Servicio que almacena y gestiona identidades digitales. Auth0 admite proveedores de identidad de confianza de tipo social, empresarial y legal."
    },
    {
      term: "JSON Web Token (JWT)",
      description:
        "Método abierto y estándar de la industria (RFC 7519) para representar claims de forma segura entre dos partes. En Auth0, los ID Tokens siempre se devuelven en formato JWT, y los tokens de acceso frecuentemente también."
    },
    {
      term: "Localization",
      description: "Capacidad de mostrar la experiencia de Universal Login en un idioma compatible."
    },
    {
      term: "Lock",
      description: "Widget de interfaz de usuario de Auth0 para autenticar usuarios. Está listo para usar tal como es y es la interfaz predeterminada de la experiencia de Universal Login clásico."
    },
    {
      term: "Management API",
      description: "API de Auth0 para gestionar los servicios de Auth0 y realizar tareas administrativas de forma programática."
    },
    {
      term: "Metadata",
      description: "Información que los usuarios pueden actualizar, como preferencias o configuraciones de perfil. Los metadatos se añaden a los ID Tokens y pueden almacenarse en los perfiles de usuario."
    },
    {
      term: "Migration",
      description: "Proceso mediante el cual un cliente deja de utilizar una función o comportamiento determinado. Las migraciones deben realizarse durante la etapa de obsolescencia."
    },
    {
      term: "Multi-factor authentication (MFA)",
      description: "Proceso de autenticación que considera múltiples factores. Por lo general, el primer factor es el username y la contraseña, y el segundo es un código o enlace por correo electrónico/SMS, o un OTP a través de una aplicación."
    },
    {
      term: "Nonce",
      description: "Número arbitrario (generalmente aleatorio o pseudoaleatorio) emitido en un protocolo de autenticación que puede utilizarse para detectar y mitigar ataques de repetición."
    },
    {
      term: "OAuth 2.0",
      description:
        "Marco de autorización que define protocolos y flujos de trabajo de autorización. OAuth 2.0 define roles, concesiones de autorización, solicitudes y respuestas de autorización, y el manejo de tokens."
    },
    {
      term: "OpenID",
      description: "Estándar abierto de autenticación que permite a las aplicaciones verificar que los usuarios son quienes dicen ser, sin necesidad de recopilar ni almacenar información de inicio de sesión."
    },
    {
      term: "Organizations",
      description: "Producto de Auth0 que permite a los clientes B2B categorizar a los usuarios finales y definir roles específicos, experiencia de inicio de sesión y acceso a recursos."
    },
    {
      term: "Passwordless",
      description: "Forma de autenticación en la que el primer factor no es una contraseña. En su lugar, puede ser una contraseña de un solo uso recibida por correo electrónico o SMS, una notificación push o un sensor biométrico."
    },
    {
      term: "Perimeter",
      description: "Conjunto de límites que abarca un directorio, todos sus usuarios y todas las aplicaciones que lo utilizan."
    },
    {
      term: "Product Release Stages",
      description: "Fases que describen cómo Auth0 prepara, lanza y retira la funcionalidad de sus productos."
    },
    {
      term: "Public Client",
      description:
        "Según el protocolo OAuth 2.0, los clientes pueden ser confidenciales o públicos. Los clientes públicos no pueden almacenar credenciales de forma segura, por lo que solo deben utilizar tipos de concesión que no requieran el uso de su secreto del cliente."
    },
    {
      term: "Raw Credential",
      description: "Secreto compartido o conjunto de información acordado entre el usuario y el recurso que permite al recurso verificar la identidad de un usuario."
    },
    {
      term: "Refresh Token",
      description: "Tipo especial de token que puede utilizarse para obtener un nuevo token de acceso. Es útil para renovar tokens de acceso próximos a expirar sin obligar al usuario a iniciar sesión de nuevo."
    },
    {
      term: "Refresh Token Rotation",
      description: "Estrategia que consiste en reemplazar los tokens de actualización con frecuencia para minimizar la exposición a vulnerabilidades. Cada intercambio también devuelve un nuevo token de actualización."
    },
    {
      term: "Relying Party",
      description: "Entidad (como un servicio o aplicación) que depende de un proveedor de identidad externo para autenticar a un usuario."
    },
    {
      term: "Resource Owner",
      description: "Entidad (como un usuario o una aplicación) capaz de otorgar acceso a un recurso protegido."
    },
    {
      term: "Resource Server",
      description: "Servidor que aloja recursos protegidos. Los servidores de recursos aceptan y responden a las solicitudes de recursos protegidos."
    },
    {
      term: "Role",
      description: "Aspecto de la identidad de un usuario que se le asigna para indicar el nivel de acceso que debe tener al sistema."
    },
    {
      term: "Scope",
      description: "Mecanismo que define las acciones específicas que las aplicaciones pueden realizar o la información que pueden solicitar en nombre de un usuario."
    },
    {
      term: "Security Assertion Markup Language (SAML)",
      description: "Protocolo estandarizado basado en XML mediante el cual dos partes pueden intercambiar información de autenticación sin necesidad de contraseña."
    },
    {
      term: "Security Token",
      description: "Artefacto firmado digitalmente que se utiliza para demostrar que el usuario fue autenticado correctamente."
    },
    {
      term: "Session Cookie",
      description: "Entidad emitida por el middleware una vez que verifica que el token recibido está firmado, es válido y proviene de una fuente de confianza."
    },
    {
      term: "Shadow Account",
      description: "Práctica difícil de mantener que consiste en aprovisionar manualmente a un usuario de un directorio local de forma independiente en un directorio remoto cuando necesita acceso a aplicaciones remotas."
    },
    {
      term: "Signing Algorithm",
      description: "Algoritmo de hash utilizado para firmar digitalmente los tokens y garantizar que no han sido manipulados."
    },
    {
      term: "Single Sign-On (SSO)",
      description: "Servicio que, tras el inicio de sesión de un usuario en una aplicación, lo autentica automáticamente en otras aplicaciones. El cierre de sesión único funciona de manera similar, pero a la inversa."
    },
    {
      term: "Subscription",
      description: "Acuerdo que define las funciones y cuotas disponibles para cada uno de tus tenants."
    },
    {
      term: "Suspicious IP Throttling",
      description: "Forma de protección contra ataques que protege tu tenant frente a inicios de sesión sospechosos dirigidos a demasiadas cuentas desde una única dirección IP."
    },
    {
      term: "Tenant",
      description: "Grupo lógicamente aislado de usuarios que comparten acceso común con privilegios específicos a una única instancia de software."
    },
    {
      term: "Token Endpoint",
      description: "Endpoint del Servidor de autorización que se utiliza para solicitar tokens de forma programática."
    },
    {
      term: "Trigger",
      description: "Evento que invoca automáticamente un Action cuando se produce una operación específica en tiempo de ejecución, como el inicio de sesión de un usuario."
    },
    {
      term: "Trust",
      description: "Un recurso confía en un proveedor de identidad o autoridad cuando está dispuesto a aceptar lo que dicha autoridad afirma sobre sus usuarios."
    },
    {
      term: "Universal Login",
      description: "Implementación de Auth0 del flujo de autenticación, que es la función principal de un Servidor de autorización."
    },
    {
      term: "Web Service Federation (WS-Fed)",
      description: "Protocolo para gestionar identidades de usuario entre sistemas, dominios y proveedores de identidad con confianza establecida mediante WS-Trust. Se utiliza principalmente en productos de Microsoft."
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
            placeholder="Buscar por nombre"
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
              aria-label={`Ir a ${letter}`}
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

        {groups.size === 0 && <p className="text-gray-500 dark:text-gray-400">No hay resultados para "{term}". Prueba con un término diferente.</p>}
      </section>
    </div>
  )
}