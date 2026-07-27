import sangasContent from "@/content/sangas/sangas.json";
import SangasPage from "../components/SangasPage";
import { SangasDocument } from "@/tina/__generated__/types";

export default function Sangas() {
  return (
    <SangasPage
      data={{ sangas: sangasContent }}
      query={SangasDocument}
      variables={{ relativePath: "sangas.json" }}
    />
  );
}
