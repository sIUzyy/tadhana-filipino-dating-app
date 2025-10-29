import Container from "@/components/containers/container";
import DashboardTitle from "@/components/dashboard/dashboard-title";
import MessageSection from "@/components/dashboard/message/message-section";

export default function MessagePage() {
  return (
    <Container className="py-5">
      <DashboardTitle
        text="Messages"
        details="Stay connected with people you’ve matched with."
        className="text-center"
      />

      <MessageSection />
    </Container>
  );
}
