import aboutContent from "@/content/about/about.json";
import AboutPage from "../components/AboutPage";

export default function About() {
  return (
    <AboutPage
      data={{ about: aboutContent }}
      query=""
      variables={{ relativePath: "about.json" }}
    />
  );
}
