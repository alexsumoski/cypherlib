// components/Carousel.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const content = [
  {
    title: "How to De-Google your Android",
    description: "A Comprehensive Guide to Privacy-Focused Alternatives",
    image: "/test.jpg",
  },
  {
    title: "The Art of Anonymous Online Communication",
    description: "Mastering Encrypted Messaging and Email",
    image: "/test.jpg",
  },
  {
    title: "Financial Privacy in the Digital Age",
    description: " Using Cryptocurrencies and Cash",
    image: "/test.jpg",
  },
  {
    title: "Creating and Managing Digital Identities",
    description: "Strategies for Anonymity on the Internet",
    image: "/test.jpg",
  },
];

const Carousel: React.FC = () => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1580: {
          slidesPerView: 3,
        },
      }}
      className="mySwiper mb-12"
    >
      {content.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center py-10 mb-4">
          <div className="relative w-full h-60">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={item.image}
              alt={`Slide ${index}`}
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end rounded-lg p-8">
              <h3 className="text-white text-xl font-bold">{item.title}</h3>
              <p className="text-white text-base">{item.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
