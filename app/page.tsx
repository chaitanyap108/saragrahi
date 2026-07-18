import homeContent from "@/content/home/home.json";
import type { HomeQuery, HomeQueryVariables } from "@/tina/__generated__/types";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <HomePage
      data={{ home: homeContent } as unknown as HomeQuery}
      query=""
      variables={{ relativePath: "home.json" } as HomeQueryVariables}
    />
  );
}
