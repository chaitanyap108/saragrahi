"use client";

import { useTina } from "tinacms/dist/react";
import type contactContent from "@/content/contact/contact.json";
import BrushStrokeDivider from "./BrushStrokeDivider";
import ContactForm from "./ContactForm";

type ContactPageProps = {
  data: { contact: typeof contactContent };
  query: string;
  variables: { relativePath: string };
};

export default function ContactPage({ data, query, variables }: ContactPageProps) {
  const { data: tinaData } = useTina({ query, variables, data });
  const page = tinaData.contact;

  return (
    <>
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">{page.sectionLabel}</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          {page.heading}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          {page.description}
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      <section className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-card">
        <div className="max-w-xl mx-auto pb-16 md:pb-20">
          <ContactForm />
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="card" />
      </section>
    </>
  );
}
