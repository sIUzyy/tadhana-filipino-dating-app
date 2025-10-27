// next
import Link from "next/link";

// type
interface FooterLinkItem {
  label: string;
  href: string;
}

// type
interface FooterLinks {
  title: string;
  links: FooterLinkItem[];
}

export default function FooterDisplayLinks({ data }: { data: FooterLinks }) {
  const { title, links } = data;
  return (
    <div>
      <h3 className="font-semibold text-base mb-2 md:mb-5">{title}</h3>
      <ul className="text-sm space-y-1">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              scroll={true}
              className="hover:text-vibrant-red hover:font-semibold hoverEffect"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
