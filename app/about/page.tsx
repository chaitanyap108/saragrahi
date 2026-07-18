import { client } from "@/tina/__generated__/client";
import AboutPage from "../components/AboutPage";

export default async function About() {
  const result = await client.queries.about({ relativePath: "about.json" });
  return (
    <AboutPage data={result.data} query={result.query} variables={result.variables} />
  );
}
