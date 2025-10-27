// next
import Image from "next/image";

// image
import Logo from "../../images/logo/tadhana-logo-text.webp";

export default function FooterBrandingLogo() {
  return (
    <div>
      <Image
        src={Logo}
        alt="tadhana-logo-text"
        className="w-40"
        loading="lazy"
      />
      <p className="max-w-[410px] mt-6">
        Tadhana is a Filipino dating app to find real love and lasting
        connections. Tara, hanap na ng iyong tadhana.
      </p>
    </div>
  );
}
