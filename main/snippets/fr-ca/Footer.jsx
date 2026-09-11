export const Footer = () => {
  const footerData = {
    socials: {
      "x-twitter": "https://x.com/auth0",
      github: "https://github.com/auth0",
      linkedin: "https://www.linkedin.com/company/auth0"
    },
    links: [
      {
        header: "Développeurs",
        items: [
          { label: "Centre des développeurs", href: "https://developer.auth0.com" },
          { label: "Exemples de code et guides", href: "https://developer.auth0.com/resources" },
          { label: "Infolettre Zero Index", href: "https://auth0.com/blog/newsletter" },
          { label: "Blogue", href: "https://auth0.com/blog" },
          { label: "Journal des modifications", href: "https://auth0.com/changelog" }
        ]
      },
      {
        header: "Documentation",
        items: [
          { label: "Documentation", href: "https://auth0.com/docs" },
          { label: "Quickstarts", href: "https://auth0.com/docs/quickstarts" },
          { label: "API", href: "https://auth0.com/docs/api" },
          { label: "SDK Libraries", href: "https://auth0.com/docs/libraries" },
          { label: "Formation", href: "https://auth0.com/learn" },
          { label: "Introduction à l'IAM (CIAM)", href: "https://auth0.com/intro-to-iam" },
          { label: "Rapports", href: "https://auth0.com/resources/whitepapers" },
          { label: "Webinaires", href: "https://auth0.com/resources/webinars" }
        ]
      },
      {
        header: "Support Center",
        items: [
          { label: "Community", href: "https://community.auth0.com" },
          { label: "Aide", href: "https://support.auth0.com" },
          { label: "FAQ", href: "https://auth0.com/docs/troubleshoot" },
          { label: "Auth0", href: "https://auth0.com" }
        ]
      },
      {
        header: "Entreprise",
        items: [
          { label: "Nos clients", href: "https://auth0.com/customers" },
          { label: "Conformité", href: "https://auth0.com/security" },
          { label: "Partenaires", href: "https://auth0.com/partners" },
          { label: "Carrières", href: "https://www.okta.com/company/careers" },
          { label: "Okta + Auth0", href: "https://www.okta.com/okta-and-auth0" },
          { label: "À propos", href: "https://auth0.com/about" },
          { label: "État du service", href: "https://status.auth0.com/" },
          { label: "Mentions légales", href: "https://www.okta.com/legal/" },
          { label: "Confidentialité", href: "https://www.okta.com/legal/privacy-policy/" },
          { label: "Conditions d'utilisation", href: "https://www.okta.com/legal/terms-of-service/" },
          { label: "Vos choix en matière de confidentialité", href: "https://auth0.com/your-privacy-choices" }
        ]
      }
    ]
  }

  return (
    <footer id="footer" className="flex flex-col items-center mx-auto border-t border-gray-100 dark:border-gray-800/50 w-full">
      <div className="flex w-full flex-col gap-12 justify-between px-8 py-16 md:py-20 lg:py-28 max-w-[984px] z-0">
        <div className="flex flex-col md:flex-row gap-8 justify-between min-h-[76px]">
          {/* Logo and Social Icons */}
          <div className="flex md:flex-col justify-between items-center md:items-start min-w-16 md:min-w-20 lg:min-w-48 md:gap-y-24">
            <a href="/">
              <span className="sr-only">Page d'accueil Auth0 Docs</span>
              <img className="nav-logo w-auto relative object-contain block dark:hidden max-w-48 h-[26px]" alt="Auth0 Docs" src="/docs/images/logo/light.svg" />
              <img className="nav-logo w-auto relative object-contain hidden dark:block max-w-48 h-[26px]" alt="Auth0 Docs" src="/docs/images/logo/dark.svg" />
            </a>
            <div className="gap-4 min-w-[140px] max-w-[492px] flex-wrap h-fit flex justify-end md:justify-start">
              <a href={footerData.socials["x-twitter"]} target="_blank" className="h-fit">
                <span className="sr-only">x-twitter</span>
                <Icon icon="x-twitter" color="#797979" className="w-5 h-5 text-gray-500 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-500" />
              </a>
              <a href={footerData.socials.github} target="_blank" className="h-fit">
                <span className="sr-only">github</span>
                <Icon icon="github" color="#797979" className="w-5 h-5 text-gray-500 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-500" />
              </a>
              <a href={footerData.socials.linkedin} target="_blank" className="h-fit">
                <span className="sr-only">linkedin</span>
                <Icon icon="linkedin" color="#797979" className="w-5 h-5 text-gray-500 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-500" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:grid max-md:!grid-cols-2 gap-8 flex-1" style={{ gridTemplateColumns: "repeat(4, minmax(0px, 1fr))" }}>
            {footerData.links.map((section, index) => (
              <div key={index} className="flex flex-col gap-4 flex-1 whitespace-nowrap w-full md:items-center">
                <div className="flex gap-4 flex-col">
                  <p className="text-sm font-semibold text-gray-950 dark:text-white mb-1">{section.header}</p>
                  {section.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      className="text-sm max-w-36 whitespace-normal md:truncate text-gray-950/50 dark:text-white/50 hover:text-gray-950/70 dark:hover:text-white/70"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}