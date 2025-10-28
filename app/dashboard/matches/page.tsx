import Container from "@/components/containers/container";
import DashboardTitle from "@/components/dashboard/dashboard-title";
import MatchesContent from "@/components/dashboard/matches/matches-content";

export default function MatchesPage() {
  return (
    <Container className="py-5">
      {/* header */}
      <DashboardTitle
        text="Your Matches"
        details="See people who share the same interests with you."
      />

      {/* content */}
      <MatchesContent />
    </Container>
  );
}
