import homeContent from "@/content/home/home.json";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <HomePage
      data={{ home: homeContent }}
      query=""
      variables={{ relativePath: "home.json" }}
    />
  );
}
