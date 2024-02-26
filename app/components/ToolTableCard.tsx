import React from "react";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Tooltip from "../shared/Tooltip";

interface ToolCardProps {
  tool: any;
  handleSelect: (tool: any) => void;
  getIcons: (platform: string) => JSX.Element | null;
}

const ToolTableCard: React.FC<ToolCardProps> = ({
  tool,
  handleSelect,
  getIcons,
}) => {
  console.log(tool);
  console.log("hi");

  return (
    <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} key={tool.fields.id}>
      <div
        onClick={() => handleSelect(tool)}
        className="relative cursor-pointer bg-black/50 border-[0.5px] border-white/30 rounded-lg hover:bg-slate-900/50 backdrop-blur-md transition duration-300 ease-in-out"
      >
        {/* Mobile View */}
        <div className="flex flex-col items-center p-4 sm:hidden">
          <div className="flex items-center justify-start w-full mb-2">
            <div className="h-16 w-16 bg-gray-900/40 rounded-sm mr-4">
              <Image
                src={
                  tool.fields.logo?.fields.file.url
                    ? `https://${tool.fields.logo?.fields.file.url}`
                    : "/test.jpg"
                }
                alt={
                  tool.fields.image?.fields.description || "Image description"
                }
                layout="fill"
                objectFit="contain"
                className="rounded-md !relative"
              />
            </div>
            <h2 className="text-lg text-white font-bold mr-3">
              {tool.fields.name}
            </h2>
          </div>
          <div className="w-full">
            <p className="text-white py-2">{tool.fields.cardDescription}</p>
            <div className="mt-2">
              <p className="bg-slate-800 rounded-full px-3 py-1 text-white text-sm w-fit">
                {tool.fields.category}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between p-4">
          <div className="flex items-center w-full">
            <div className="h-14 w-14 bg-gray-900/40 rounded-sm mr-4">
              <Image
                src={
                  tool.fields?.logo?.fields?.file?.url
                    ? `https://${tool.fields.logo.fields.file.url}`
                    : "/test.jpg"
                }
                alt={
                  tool.fields?.image?.fields?.description || "Image description"
                }
                layout="fill"
                objectFit="contain"
                className="rounded-lg !relative"
              />
            </div>
            <h2 className="text-lg text-white font-bold mr-6 flex-1">
              {tool.fields.name}
            </h2>
            <p className="text-white flex-1">{tool.fields.cardDescription}</p>
            <div className="flex items-center flex-1">
              <p className="bg-slate-800 rounded-full px-3 py-1 text-white text-sm mr-4">
                {tool.fields.category}
              </p>
              {getIcons(tool.fields.platform)}
            </div>
          </div>

          <div className="w-20 flex justify-center items-center">
            <Tooltip
              position="left"
              darkBackground
              tooltipText={tool.fields.tooltip}
            >
              <FaInfoCircle className="text-white text-2xl cursor-pointer" />
            </Tooltip>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ToolTableCard;
