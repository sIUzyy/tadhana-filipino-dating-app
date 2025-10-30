// components
import Container from "@/components/containers/container";
import DiscoveryFooter from "@/components/dashboard/discovery/discovery-footer";
import DiscoveryHeader from "@/components/dashboard/discovery/discovery-header";
import DiscoverySwipingMechanics from "@/components/dashboard/discovery/discovery-swiping-mechanics";

export default function Dashboard() {
  return (
    <Container className="py-5 h-[90vh] flex flex-col items-center justify-center">
      {/* header (start finding your tadhana...) */}
      <DiscoveryHeader />

      {/* data-content (swiping cards) */}
      <DiscoverySwipingMechanics />

      {/* footer (notes about filteration) */}
      <DiscoveryFooter />
    </Container>
  );
}
