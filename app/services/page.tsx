import servicesContent from "@/content/services/services.json";
import ServicesPage from "../components/ServicesPage";
import { ServicesDocument } from "@/tina/__generated__/types";

export default function Services() {
  return (
    <ServicesPage
      data={{ services: servicesContent }}
      query={ServicesDocument}
      variables={{ relativePath: "services.json" }}
    />
  );
}
