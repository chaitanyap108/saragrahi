import { client } from "@/tina/__generated__/client";
import SangasPage from "../components/SangasPage";

export default async function Sangas() {
  const result = await client.queries.sangas({ relativePath: "sangas.json" });
  return <SangasPage data={result.data} query={result.query} variables={result.variables} />;
}
