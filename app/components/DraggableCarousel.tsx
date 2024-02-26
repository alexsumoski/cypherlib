"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

type Guide = {
  fields: {
    title: string;
    subtitle: string;
    description: string;
    heroImage: any;
  };
};

type CarouselProps = {
  guides: Guide[];
};

const Carousel: React.FC<CarouselProps> = ({ guides }) => {
  const [emblaRef, embla] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  // @ts-ignore
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    return () => embla.off("select", onSelect);
  }, [embla, onSelect]);

  return (
    <div className="embla-viewport">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {guides.map((guide, index) => (
            <div key={index} className="embla__slide">
              <Link
                href={`/guides/${encodeURIComponent(
                  guide.fields.title
                    ? guide.fields.title.replace(/\s+/g, "-").toLowerCase()
                    : ""
                )}`}
                legacyBehavior
              >
                <a className="relative w-full h-64 block">
                  <img
                    className="w-full h-full object-cover rounded-lg border-[1px] border-white/30"
                    src={guide.fields.heroImage?.fields.file.url}
                    alt={guide.fields.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end rounded-lg p-8">
                    <h3 className="text-white text-2xl font-bold text-shadow-large">
                      {guide.fields.title}
                    </h3>
                    <h5 className="text-white text-base text-shadow-large">
                      {guide.fields.subtitle}
                    </h5>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="embla__dots">
          {guides.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              onClick={() => embla && embla.scrollTo(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
