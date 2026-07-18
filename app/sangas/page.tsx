import sangasContent from "@/content/sangas/sangas.json";
import type { SangasQuery, SangasQueryVariables } from "@/tina/__generated__/types";
import SangasPage from "../components/SangasPage";

export default function Sangas() {
  return (
    <SangasPage
      data={{ sangas: sangasContent } as unknown as SangasQuery}
      query=""
      variables={{ relativePath: "sangas.json" } as SangasQueryVariables}
    />
  );
}
