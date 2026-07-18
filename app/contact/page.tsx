import contactContent from "@/content/contact/contact.json";
import ContactPage from "../components/ContactPage";

export default function Contact() {
  return (
    <ContactPage
      data={{ contact: contactContent }}
      query=""
      variables={{ relativePath: "contact.json" }}
    />
  );
}
