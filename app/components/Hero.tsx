import React from "react";
import Image from "next/image";
import { useTab } from "../lib/TabContext";
import Tilt from "react-parallax-tilt";

interface HeroInterface {
  id: string;
  title: string;
  imageUrl: string;
}

const heroCards: HeroInterface[] = [
  { id: "privacy-tools", title: "Card 1", imageUrl: "/test.jpg" },
  { id: "cypherpunks", title: "Card 2", imageUrl: "/test.jpg" },
];

const Hero: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();

  return (
    <div className="flex flex-col w-full justify-center items-center h-96 my-16 gap-4">
      {heroCards.map((card) => (
        <Tilt
          key={card.id}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          transitionSpeed={1000}
          className="flex-1 h-80"
        >
          <div
            className={`relative h-full w-full max-w-sm border-[1px] overflow-hidden cursor-pointer`}
            onClick={() => setActiveTab(card.id)}
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black flex justify-center items-center">
              <h2 className="text-white text-xl font-bold">{card.title}</h2>
            </div>
            {activeTab === card.id && (
              <div className="absolute inset-0 bg-white bg-opacity-10 mix-blend-normal"></div>
            )}
          </div>
        </Tilt>
      ))}
    </div>
  );
};

export default Hero;
