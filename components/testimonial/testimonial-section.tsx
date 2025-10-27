import Container from "../containers/container";
import TestimonialCard from "./testimonial-card";

export default function TestimonialSection() {
  const data = [
    {
      name: "Miguel & Anne",
      title: "Matched on Tadhana in 2025",
      content:
        "We never thought we’d meet through an app! Thanks to Tadhana, we found each other and have been inseparable ever since. Minsan, app lang pala ang pagitan ng tadhana mo.",
      rating: 5,
    },
    {
      name: "Ria & Sam",
      title: "Found love on Tadhana, 2025",
      content:
        "Akala ko friendly chats lang — pero ayun, naging daily good morning and good night messages na! Salamat, Tadhana, for giving us a safe space to be ourselves and find love.",
      rating: 5,
    },
    {
      name: "Ken & Paolo",
      title: "Matched through Tadhana, 2025",
      content:
        "We clicked instantly! It’s rare to find someone who understands you so well. Tadhana made it easy to connect and be real — no judgment, just genuine connection.",
      rating: 5,
    },

    {
      name: "Mia & Carlo",
      title: "From Swipe to Soulmate, 2025",
      content:
        "It all started with a single swipe that changed everything. Tadhana made it easy to find someone who truly understands me. Totoo pala, may tamang tao sa tamang oras.",
      rating: 5,
    },
  ];

  return (
    <Container className="max-w-330 py-4">
      <div className="flex gap-3 flex-wrap justify-center ">
        {data.map((testimonial, index) => (
          <TestimonialCard data={testimonial} key={index} />
        ))}
      </div>
    </Container>
  );
}
