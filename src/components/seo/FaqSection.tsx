import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/lib/blog/RichText";
import { faqJsonLd } from "@/lib/seo";

export type FaqItem = { question: string; answer: string };

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section>
      <JsonLd data={faqJsonLd(items)} />
      <h2 className="font-display text-2xl font-bold text-navy">
        Questions fréquentes
      </h2>
      <dl className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-display text-lg font-semibold text-navy">
              {item.question}
            </dt>
            <dd className="mt-2 leading-relaxed">
              <RichText text={item.answer} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
