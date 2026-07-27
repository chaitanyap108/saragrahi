import aboutContent from "@/content/about/about.json";
import AboutPage from "../components/AboutPage";
import { AboutDocument } from "@/tina/__generated__/types";

export default function About() {
  return (
    <AboutPage
      data={{ about: aboutContent }}
      query={AboutDocument}
      variables={{ relativePath: "about.json" }}
    />
  );
}
