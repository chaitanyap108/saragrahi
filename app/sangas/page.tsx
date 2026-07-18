import sangasContent from "@/content/sangas/sangas.json";
import SangasPage from "../components/SangasPage";

export default function Sangas() {
  return (
    <SangasPage
      data={{ sangas: sangasContent }}
      query=""
      variables={{ relativePath: "sangas.json" }}
    />
  );
}
