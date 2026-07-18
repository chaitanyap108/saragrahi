import servicesContent from "@/content/services/services.json";
import type { ServicesQuery, ServicesQueryVariables } from "@/tina/__generated__/types";
import ServicesPage from "../components/ServicesPage";

export default function Services() {
  return (
    <ServicesPage
      data={{ services: servicesContent } as unknown as ServicesQuery}
      query=""
      variables={{ relativePath: "services.json" } as ServicesQueryVariables}
    />
  );
}
