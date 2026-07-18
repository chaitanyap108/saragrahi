import { client } from "@/tina/__generated__/client";
import ContactPage from "../components/ContactPage";

export default async function Contact() {
  const result = await client.queries.contact({ relativePath: "contact.json" });
  return <ContactPage data={result.data} query={result.query} variables={result.variables} />;
}
