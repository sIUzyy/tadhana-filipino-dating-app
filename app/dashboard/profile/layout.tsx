// components
import Container from "@/components/containers/container";
import SidebarSection from "@/components/dashboard/profile/sidebar-section";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex flex-col md:flex-row gap-5 py-5">
      {/* sidebar (left-side) */}
      <SidebarSection />

      {/* data-content (profile or preferences) */}
      <div className="flex-1 border border-[#EAEAEA] dark:bg-[#18181B] dark:border-[#27272C] rounded-md p-4 transition-all">
        {children}
      </div>
    </Container>
  );
}
