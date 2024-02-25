// components/Card.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  imageUrl: string;
  subtitle: string;
  title: string;
  category: string;
  text: string;
  linkHref: string;
  linkText: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  subtitle,
  title,
  category,
  text,
  linkHref,
  linkText,
}) => {
  return (
    <div className="w-full overflow-hidden shadow-sm backdrop-filter backdrop-blur-sm border border-slate-800 bg-purple-800 bg-opacity-10 rounded-2xl p-8">
      {" "}
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        className="w-full"
      />
      <div>
        <div className="pt-6">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{subtitle}</p>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {category}
          </div>
          <div className="bg-gray-200 rounded px-3 py-1 text-sm">{text}</div>
        </div>
        <Link href={linkHref} legacyBehavior>
          <a className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mt-4">
            {linkText}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
