import contactContent from "@/content/contact/contact.json";
import type { ContactQuery, ContactQueryVariables } from "@/tina/__generated__/types";
import ContactPage from "../components/ContactPage";

export default function Contact() {
  return (
    <ContactPage
      data={{ contact: contactContent } as unknown as ContactQuery}
      query=""
      variables={{ relativePath: "contact.json" } as ContactQueryVariables}
    />
  );
}
