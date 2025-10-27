import { User, Settings2, MousePointer2, MessagesSquare } from "lucide-react";

const features = [
  {
    name: "Create Account",
    description:
      "Sign up and log in securely to get started on your Tadhana journey.",
    icon: User,
  },
  {
    name: "Customize Your Preferences",
    description:
      "Set your interests and preferences to find people who match your values, vibe, and relationship goals.",
    icon: Settings2,
  },
  {
    name: "Start Swiping",
    description:
      "Browse through profiles and swipe until you find someone who sparks your interest — your Tadhana might be just one swipe away.",
    icon: MousePointer2,
  },

  {
    name: "Start Messaging",
    description:
      "Once you’ve matched, start chatting and build genuine connections that go beyond the screen. ",
    icon: MessagesSquare,
  },
];

export default function FeatureData() {
  return (
    <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
      <dl className="grid grid-cols-1 gap-10 lg:grid-cols-2 ">
        {features.map((feature, idx) => (
          <div key={idx} className="relative pl-16">
            <dt className="text-base/7 font-semibold text-slate-700">
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-vibrant-red">
                <feature.icon className="size-6 text-white" />
              </div>
              {feature.name}
            </dt>
            <dd className="text-base text-slate-600 leading-relaxed">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
