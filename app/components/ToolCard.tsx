// components/ToolFullWidthCard.tsx
import React from "react";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Tooltip from "../shared/Tooltip";

interface ToolFullWidthCardProps {
  tool: Tool;
  handleSelect: (tool: Tool) => void;
  getIcons: (platform: string) => JSX.Element | null;
}

const ToolCard: React.FC<ToolFullWidthCardProps> = ({
  tool,
  handleSelect,
  getIcons,
}) => {
  return (
    <div
      onClick={() => handleSelect(tool)}
      className="bg-black/50 border overflow-visible border-slate-700 rounded-lg hover:bg-slate-900/50 backdrop-blur-md transition duration-300 ease-in-out cursor-pointer w-full"
    >
      <div className="flex flex-col p-4">
        <div className="md:w-1/4 p-4 flex justify-center">
          <Image
            src={
              tool.fields.logo?.fields.file.url
                ? `https://${tool.fields.logo?.fields.file.url}`
                : "/placeholder.jpg"
            }
            alt={tool.fields.image?.fields.description || "Image description"}
            width={200}
            height={200}
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        <div className="md:w-3/4 p-4">
          <h2 className="text-2xl text-white font-bold">{tool.fields.name}</h2>
          <p className="text-white mt-2">{tool.fields.cardDescription}</p>
          <div className="flex flex-wrap items-center mt-4">
            <p className="bg-slate-800 rounded-full px-3 py-1 text-white text-sm mr-4">
              {tool.fields.category}
            </p>
            {tool.fields.platform && getIcons(tool.fields.platform)}
            <div className="flex gap-2 mt-2 flex-wrap">
              {tool.fields.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 rounded-full px-3 py-1 text-white text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <Tooltip
          position="left"
          darkBackground
          tooltipText={tool.fields.tooltip}
        >
          <FaInfoCircle className="text-white text-2xl cursor-pointer" />
        </Tooltip>
      </div>
    </div>
  );
};

export default ToolCard;
