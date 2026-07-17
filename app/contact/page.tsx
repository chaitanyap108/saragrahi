import BrushStrokeDivider from "../components/BrushStrokeDivider";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">Get in Touch</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          Questions about services, sangas, or how to begin? Send a message and
          we will respond with care.
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="card" />

      <section className="py-20 px-6 lg:px-10 bg-card">
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
