import { client } from "@/tina/__generated__/client";
import ServicesPage from "../components/ServicesPage";

export default async function Services() {
  const result = await client.queries.services({ relativePath: "services.json" });
  return <ServicesPage data={result.data} query={result.query} variables={result.variables} />;
}
