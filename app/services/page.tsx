import servicesContent from "@/content/services/services.json";
import ServicesPage from "../components/ServicesPage";

export default function Services() {
  return (
    <ServicesPage
      data={{ services: servicesContent }}
      query=""
      variables={{ relativePath: "services.json" }}
    />
  );
}
