import { client } from "@/tina/__generated__/client";
import PalmistryIntakePage from "../components/PalmistryIntakePage";

export default async function PalmistryIntake() {
  const result = await client.queries.palmistryIntake({ relativePath: "palmistry-intake.json" });
  return <PalmistryIntakePage data={result.data} query={result.query} variables={result.variables} />;
}
