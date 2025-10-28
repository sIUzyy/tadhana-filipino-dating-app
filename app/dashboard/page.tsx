// components
import Container from "@/components/containers/container";
import DiscoveryHeader from "@/components/dashboard/discovery/discovery-header";
import DiscoverySwipingMechanics from "@/components/dashboard/discovery/discovery-swiping-mechanics";

export default function Dashboard() {
  return (
    <Container className="py-5 flex flex-col items-center justify-center">
      <DiscoveryHeader />
      <DiscoverySwipingMechanics />
    </Container>
  );
}
