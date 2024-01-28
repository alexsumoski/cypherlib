// components/GuidesCarousel.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const guidesData = [
  {
    id: 1,
    title: "Guide One",
    description: "This is a brief description of Guide One.",
    imageUrl: "",
    slug: "/guide-one",
  },
  {
    id: 2,
    title: "Guide Two",
    description: "This is a brief description of Guide Two.",
    imageUrl: "",
    slug: "/guide-two",
  },
  {
    id: 3,
    title: "Guide Two",
    description: "This is a brief description of Guide Two.",
    imageUrl: "",
    slug: "/guide-two",
  },
];

const GuidesCarousel: React.FC = () => {
  return (
    <section className="relative w-[100%] h-46">
      {guidesData.map((guide) => (
        <div key={guide.id} className="absolute inset-0">
          <Image
            src={guide.imageUrl}
            alt={guide.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 p-10 bg-gradient-to-t from-black via-transparent to-transparent">
            <h2 className="text-4xl text-white font-bold">{guide.title}</h2>
            <p className="text-white">{guide.description}</p>
            <Link href={guide.slug} legacyBehavior>
              <a className="text-white underline mt-4 inline-block">
                Read More
              </a>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GuidesCarousel;
