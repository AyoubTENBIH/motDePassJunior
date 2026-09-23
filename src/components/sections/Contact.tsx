"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LocationMap } from "@/components/contact/LocationMap";
import { contact, whatsappUrl } from "@/lib/content";

const niveaux = [
  "Préscolaire",
  "Maternelle",
  "Primaire",
  "Je ne sais pas encore",
] as const;

const fieldClass =
  "h-14 w-full rounded-full border-0 bg-[#F4F1EA] px-6 text-sm text-navy placeholder:text-ink/35 outline-none transition focus:ring-2 focus:ring-orange/45";

export function Contact({ hideHeading = false }: { hideHeading?: boolean }) {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [niveau, setNiveau] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Bonjour Mot de Passe Junior,",
      "",
      `Je m'appelle ${parentName.trim() || "(non précisé)"}.`,
      phone.trim() ? `Téléphone : ${phone.trim()}` : null,
      niveau ? `Niveau souhaité : ${niveau}` : null,
      "",
      message.trim() || "Je souhaite des informations sur les inscriptions.",
    ].filter(Boolean);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {hideHeading ? null : (
              <h2 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-[3.4rem]">
                Entrons en
                <br />
                contact.
              </h2>
            )}
            <p className={`${hideHeading ? "mt-0" : "mt-4"} max-w-md text-base leading-relaxed text-ink/65`}>
              Une question, une visite, une pré-inscription ? Écrivez-nous, on
              vous répond sur WhatsApp.
            </p>

            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="font-semibold text-navy">WhatsApp</dt>
                <dd className="mt-1 text-ink/65">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Téléphone</dt>
                <dd className="mt-1">
                  <a
                    href={contact.phoneHref}
                    className="text-ink/65 transition-colors hover:text-orange"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Adresse</dt>
                <dd className="mt-1 text-ink/65">
                  {contact.streetAddress}
                  <br />
                  {contact.neighborhood}, {contact.addressLocality}{" "}
                  {contact.postalCode}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Horaires</dt>
                <dd className="mt-1 text-ink/65">
                  {contact.hours ??
                    "Horaires à confirmer auprès de l'école — [DONNÉE ÉCOLE À CONFIRMER : horaires exacts]"}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block px-1 text-sm font-medium text-navy">
                    Votre nom
                  </span>
                  <input
                    type="text"
                    name="parentName"
                    required
                    autoComplete="name"
                    placeholder="Nom du parent"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block px-1 text-sm font-medium text-navy">
                    Téléphone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="06 xx xx xx xx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block px-1 text-sm font-medium text-navy">
                  Niveau souhaité
                </span>
                <select
                  name="niveau"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_1.25rem_center] bg-no-repeat pr-12`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231e3a6e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="">Choisir un parcours</option>
                  {niveaux.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block px-1 text-sm font-medium text-navy">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Parlez-nous de votre enfant, d'une visite ou d'une inscription…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-[28px] border-0 bg-[#F4F1EA] px-6 py-4 text-sm text-navy placeholder:text-ink/35 outline-none transition focus:ring-2 focus:ring-orange/45"
                />
              </label>

              <div className="mt-2 flex justify-end">
                <MagneticButton>
                  <button
                    type="submit"
                    className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full bg-navy px-7 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    Envoyer sur WhatsApp
                  </button>
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-8">
            <LocationMap />
            <div className="relative min-h-[240px] overflow-hidden rounded-[28px] md:min-h-[320px]">
              <Image
                src="/media/images/logo-decor.png"
                alt="Mot de Passe Junior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
