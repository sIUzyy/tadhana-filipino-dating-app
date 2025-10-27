// components
import Container from "../containers/container";
import FeatureData from "./feature-data";
import FeatureText from "./feature-text";

export default function FeatureSection() {
  return (
    <div id="how-it-works" className="py-24">
      <Container>
        <FeatureText />
        <FeatureData />
      </Container>
    </div>
  );
}
