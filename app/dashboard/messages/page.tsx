import Container from "@/components/containers/container";
import DashboardTitle from "@/components/dashboard/dashboard-title";

export default function MessagePage() {
  return (
    <Container className="py-5">
      <DashboardTitle
        text="Messages"
        details="Stay connected with people you’ve matched with."
      />
    </Container>
  );
}
