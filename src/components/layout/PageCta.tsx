import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contact } from "@/lib/content";

export function PageCta({
  title = "Envie de découvrir l'école ?",
  text = "Les inscriptions 2026-2027 sont ouvertes. Écrivez-nous sur WhatsApp ou demandez une visite.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <aside className="mt-14 rounded-[28px] bg-navy px-6 py-8 text-cream md:px-10 md:py-10">
      <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75 md:text-base">
        {text}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <MagneticButton>
          <Button href={contact.whatsapp} variant="primary">
            WhatsApp
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button href="/inscriptions" variant="ghost" className="border-cream/30 text-cream hover:bg-cream/10">
            Voir les inscriptions
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button href="/contact" variant="ghost" className="border-cream/30 text-cream hover:bg-cream/10">
            Contact
          </Button>
        </MagneticButton>
      </div>
    </aside>
  );
}
