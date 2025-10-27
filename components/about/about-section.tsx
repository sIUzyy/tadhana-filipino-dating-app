// components
import AboutImage from "./about-image";
import AboutText from "./about-text";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="py-16 flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4"
    >
      <AboutImage />
      <AboutText />
    </div>
  );
}
