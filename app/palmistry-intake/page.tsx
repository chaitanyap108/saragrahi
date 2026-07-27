import palmistryContent from "@/content/palmistry-intake/palmistry-intake.json";
import PalmistryIntakePage from "../components/PalmistryIntakePage";
import { PalmistryIntakeDocument } from "@/tina/__generated__/types";

export default function PalmistryIntake() {
  return (
    <PalmistryIntakePage
      data={{ palmistryIntake: palmistryContent }}
      query={PalmistryIntakeDocument}
      variables={{ relativePath: "palmistry-intake.json" }}
    />
  );
}
