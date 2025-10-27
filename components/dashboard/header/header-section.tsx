// components
import HeaderLogo from "./header-logo";
import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";
import Container from "@/components/containers/container";

export default function HeaderSection() {
  return (
    <div className="text-sm bg-white dark:bg-[#18181B] shadow transition-all">
      <Container className="h-[70px] flex items-center justify-between transition-all">
        {/*logo */}
        <HeaderLogo />

        {/*desktop-menu */}
        <HeaderDesktop />

        {/*mobile-menu */}
        <HeaderMobile />
      </Container>
    </div>
  );
}
