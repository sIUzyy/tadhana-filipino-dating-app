// components
import DashboardTitle from "@/components/dashboard/dashboard-title";
import PreferencesSelection from "@/components/dashboard/profile/preferences/preferences-selection";

export default function PreferencesPage() {
  return (
    <div>
      {/* header section */}
      <DashboardTitle
        text="Customize Your Preferences"
        details="Filter your potential matches based on gender, age and distance."
      />

      {/* preferences section */}
      <PreferencesSelection />
    </div>
  );
}
