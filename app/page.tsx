import { client } from "@/tina/__generated__/client";
import HomePage from "./components/HomePage";

export default async function Home() {
  const result = await client.queries.home({
    relativePath: "home.json",
  });

  return (
    <HomePage
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  );
}
