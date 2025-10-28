import { Metadata } from "next";
// next

// container
import Container from "@/components/containers/container";
import Title from "@/components/main-title";

// route
import PublicRoute from "@/components/routes/public-route";

// seo
export const metadata: Metadata = {
  title: {
    absolute: "Terms of Service - Tadhana",
  },
  description:
    "Read Tadhana’s Terms of Service to understand the rules, responsibilities, and guidelines for using our Filipino dating app. Learn about user conduct, content ownership, and account policies.",
  keywords: [
    "Tadhana terms of service",
    "Filipino dating app terms",
    "Tadhana user agreement",
    "Tadhana rules and policies",
    "dating app guidelines",
    "online dating terms",
  ],
};

// terms of service data
export const terms_data = [
  {
    label: "1. Acceptance of Terms",
    details:
      "By creating an account or using Tadhana, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.",
  },
  {
    label: "2. Eligibility",
    details:
      "You must be at least 18 years old to use Tadhana. By using our service, you confirm that you meet this requirement and have the legal capacity to enter into this agreement.",
  },
  {
    label: "3. User Responsibilities",
    details:
      "You are responsible for the accuracy of the information you share and for keeping your account secure. You agree not to use Tadhana for any unlawful, harmful, or misleading activity.",
  },
  {
    label: "4. Content Ownership",
    details:
      "You retain ownership of the content you post on Tadhana. However, by using the app, you grant us a non-exclusive license to display and use your content for the purpose of operating and improving the service.",
  },
  {
    label: "5. Prohibited Conduct",
    details:
      "You agree not to harass, abuse, impersonate, or harm other users. Any behavior that violates our community guidelines or applicable laws may result in account suspension or termination.",
  },
  {
    label: "6. Termination",
    details:
      "Tadhana reserves the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior, with or without prior notice.",
  },
  {
    label: "7. Limitation of Liability",
    details:
      "Tadhana is not responsible for any direct or indirect damages that may result from your use of the app or from interactions with other users. Use the service at your own discretion.",
  },
  {
    label: "8. Updates to Terms",
    details:
      "We may update these Terms of Service from time to time. Continued use of Tadhana after changes means you accept the revised terms.",
  },
  {
    label: "9. Contact Us",
    details: (
      <>
        For questions or concerns regarding these Terms of Service, please
        contact us at{" "}
        <a
          href="mailto:support@tadhana.app"
          className="text-vibrant-red font-semibold"
        >
          support@tadhana.app
        </a>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <PublicRoute>
      <div className="bg-dark-color py-16">
        <Container>
          <div>
            <Title text="Terms of Service" className="mb-4" />
            <p className="font-medium text-pretty text-gray-400">
              Welcome to <strong className="text-vibrant-red">Tadhana</strong>.
              By using our Filipino dating app and website, you agree to our
              Terms of Service, which outline the rules, responsibilities, and
              expectations that ensure a safe and respectful community for
              everyone.
            </p>

            {terms_data.map((item, index) => (
              <div key={index}>
                <h1 className="text-xl font-semibold mt-8 mb-3 text-gray-200">
                  {item.label}
                </h1>
                <p className="text-gray-400">{item.details}</p>
              </div>
            ))}

            <p className="mt-10 text-gray-400">
              Last updated: October 27, 2025
            </p>
          </div>
        </Container>
      </div>
    </PublicRoute>
  );
}
