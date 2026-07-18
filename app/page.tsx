import homeContent from "@/content/pages/home.json";
import HomePage from "./components/HomePage";

export default function Home() {
  return <HomePage data={homeContent} />;
}
