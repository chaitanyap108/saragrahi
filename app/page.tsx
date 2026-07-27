import homeContent from "@/content/home/home.json";
import HomePage from "./components/HomePage";
import { HomeDocument } from "@/tina/__generated__/types";

export default function Home() {
  return (
    <HomePage
      data={{ home: homeContent }}
      query={HomeDocument}
      variables={{ relativePath: "home.json" }}
    />
  );
}
