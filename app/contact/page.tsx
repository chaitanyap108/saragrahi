import contactContent from "@/content/contact/contact.json";
import ContactPage from "../components/ContactPage";
import { ContactDocument } from "@/tina/__generated__/types";

export default function Contact() {
  return (
    <ContactPage
      data={{ contact: contactContent }}
      query={ContactDocument}
      variables={{ relativePath: "contact.json" }}
    />
  );
}
