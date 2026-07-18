import palmistryContent from "@/content/palmistry-intake/palmistry-intake.json";
import PalmistryIntakePage from "../components/PalmistryIntakePage";

export default function PalmistryIntake() {
  return (
    <PalmistryIntakePage
      data={{ palmistryIntake: palmistryContent }}
      query=""
      variables={{ relativePath: "palmistry-intake.json" }}
    />
  );
}
