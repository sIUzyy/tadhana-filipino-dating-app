// components
import Container from "@/components/containers/container";
import Title from "@/components/main-title";

// next
import { Metadata } from "next";

// seo
export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy - Tadhana",
  },
  description:
    "Learn how Tadhana collects, uses, and protects your personal information. Your privacy and security are our top priorities.",
  keywords: [
    "Tadhana privacy policy",
    "Filipino dating app privacy",
    "data protection",
    "user privacy",
    "online dating safety",
  ],
};

// PRIVACY DATA
export const privacy_data = [
  {
    label: "1. Information We Collect",
    details:
      "We may collect personal information such as your name, email address, profile details, photos, and preferences to help match you with other users and improve your experience.",
  },
  {
    label: "2. How We Use Your Information",
    details:
      "Your information is used to create your profile, connect you with other users, and enhance app functionality. We may also use it for analytics and to improve our services.",
  },
  {
    label: "3. Data Security",
    details:
      "We use industry-standard measures to protect your data and ensure your personal information is secure from unauthorized access or disclosure.",
  },
  {
    label: "4. Third-Party Services",
    details:
      "Tadhana may use trusted third-party tools (such as analytics or authentication providers) that help us deliver and improve our services. These providers follow strict privacy and security standards.",
  },
  {
    label: "5. Your Choices",
    details: (
      <>
        You can update or delete your account at any time. If you have questions
        about how we handle your data, you may contact us at{" "}
        <a
          href="mailto:support@tadhana.app"
          className="text-vibrant-red font-semibold "
        >
          support@tadhana.app
        </a>
        .
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-dark-color py-16">
      <Container>
        <div>
          <Title text="Privacy Policy" className="mb-4" />
          <p className="font-medium text-pretty text-gray-400">
            At <strong className="text-vibrant-red">Tadhana</strong>, we value
            your privacy. This Privacy Policy explains how we collect, use, and
            protect your personal information when you use our Filipino dating
            app and website.
          </p>

          {privacy_data.map((item, index) => (
            <div key={index}>
              <h1 className="text-xl font-semibold mt-8 mb-3 text-gray-200">
                {item.label}
              </h1>
              <p className="text-gray-400">{item.details}</p>
            </div>
          ))}

          <p className="mt-10 text-gray-400">Last updated: October 27, 2025</p>
        </div>
      </Container>
    </div>
  );
}
