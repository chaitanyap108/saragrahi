import palmistryContent from "@/content/palmistry-intake/palmistry-intake.json";
import type {
  PalmistryIntakeQuery,
  PalmistryIntakeQueryVariables,
} from "@/tina/__generated__/types";
import PalmistryIntakePage from "../components/PalmistryIntakePage";

export default function PalmistryIntake() {
  return (
    <PalmistryIntakePage
      data={{ palmistryIntake: palmistryContent } as unknown as PalmistryIntakeQuery}
      query=""
      variables={
        { relativePath: "palmistry-intake.json" } as PalmistryIntakeQueryVariables
      }
    />
  );
}
