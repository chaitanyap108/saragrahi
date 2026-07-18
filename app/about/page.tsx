import aboutContent from "@/content/about/about.json";
import type { AboutQuery, AboutQueryVariables } from "@/tina/__generated__/types";
import AboutPage from "../components/AboutPage";

export default function About() {
  return (
    <AboutPage
      data={{ about: aboutContent } as unknown as AboutQuery}
      query=""
      variables={{ relativePath: "about.json" } as AboutQueryVariables}
    />
  );
}
