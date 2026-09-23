import { contact, mapsSearchUrl } from "@/lib/content";

/**
 * Carte de localisation — l'iframe Google Maps n'est pas affichée tant
 * que la fiche Google Business Profile n'existe pas et que l'adresse GPS
 * n'est pas confirmée par l'école.
 */
export function LocationMap() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-[#F4F1EA] ring-1 ring-navy/5">
      <div className="flex-1 px-5 py-5 text-sm leading-relaxed text-ink/70">
        <p className="font-semibold text-navy">Nous trouver</p>
        <p className="mt-2">
          {contact.streetAddress}
          <br />
          {contact.neighborhood}, {contact.addressLocality} {contact.postalCode}
        </p>
        <p className="mt-3 text-xs text-ink/45">
          La carte interactive sera ajoutée dès que la fiche Google Business
          Profile de l&apos;école sera créée et que l&apos;emplacement exact
          sera confirmé.
        </p>
      </div>
      {/* TODO: remplacer par l'iframe Google Maps une fois la fiche Google
          Business Profile créée et l'adresse confirmée par l'école */}
      <a
        href={mapsSearchUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-t border-navy/5 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:text-orange"
      >
        Rechercher l&apos;adresse sur Google Maps
      </a>
    </div>
  );
}
