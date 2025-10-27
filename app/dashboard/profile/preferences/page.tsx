// components
import PreferencesHeader from "@/components/dashboard/profile/preferences/preferences-header";
import PreferencesSelection from "@/components/dashboard/profile/preferences/preferences-selection";

export default function PreferencesPage() {
  return (
    <div>
      {/* header section */}
      <PreferencesHeader />

      {/* preferences section */}
      <PreferencesSelection />
    </div>
  );
}
