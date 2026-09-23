import { contact, navLinks } from "@/lib/content";

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
] as const;

const resourceLinks = [
  { label: "Inscriptions 2026-2027", href: "/inscriptions" },
  { label: "Maternelle", href: "/maternelle" },
  { label: "Guide des parents", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

const legalLinks = [
  { label: "Mentions légales", href: "#" },
  { label: "Confidentialité", href: "#" },
  { label: "Plan du site", href: "#accueil" },
] as const;

export function Footer() {
  return (
    <footer className="overflow-hidden bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-16 lg:pt-20">
        {/* Titre géant — Fredoka, pleine largeur comme la référence */}
        <h2 className="footer-brand-title w-full whitespace-nowrap text-center text-cream">
          Mot de Passe <span className="text-orange">Junior</span>
        </h2>

        {/* 4 colonnes */}
        <div className="mt-12 grid gap-10 border-t border-cream/15 pt-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8 lg:pt-12">
          {/* Contact */}
          <div>
            <p className="font-display text-lg font-bold text-cream md:text-xl">
              Nous contacter
            </p>
            <dl className="mt-5 space-y-5 text-sm leading-relaxed">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                  Adresse
                </dt>
                <dd className="mt-1.5 text-cream/85">
                  {contact.address}
                  <br />
                  Maternelle &amp; Primaire
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                  WhatsApp
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/85 transition-colors hover:text-orange"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                  Téléphone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={contact.phoneHref}
                    className="text-cream/85 transition-colors hover:text-orange"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                  Horaires
                </dt>
                <dd className="mt-1.5 text-cream/85">
                  Lun–Ven, 8h – 17h
                </dd>
              </div>
            </dl>
          </div>

          {/* Menu */}
          <div>
            <p className="font-display text-lg font-bold text-cream md:text-xl">
              Menu
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream/85">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux */}
          <div>
            <p className="font-display text-lg font-bold text-cream md:text-xl">
              Réseaux sociaux
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream/85">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p className="font-display text-lg font-bold text-cream md:text-xl">
              Ressources
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream/85">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="transition-colors hover:text-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre légale */}
      <div className="mt-14 border-t border-cream/15 md:mt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 Mot de Passe Junior — Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
