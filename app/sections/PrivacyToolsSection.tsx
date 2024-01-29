import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { FaFilter, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Tooltip from "../components/Tooltip";
import WaveLoader from "../components/WaveLoader";
import Container from "../layout/Container";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "../components/swipe/DraggableCarousel";
import Link from "next/link";
import ToolDetailPage from "../components/ToolsDetailPage";

interface Tool {
  fields: {
    id: number;
    name: string;
    category: string;
    cardDescription: string;
    platform: string;
    image: any;
    tags: string[];
    logo: any;
    tooltip: string;
  };
}

interface PrivacyToolsSectionProps {
  tools: Tool[];
}

const ITEMS_PER_PAGE = 20;

const PrivacyToolsSection: React.FC<PrivacyToolsSectionProps> = ({ tools }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [activeTool, setActiveTool] = useState(null);

  const loader = useRef(null);

  const handleToolSelect = (tool: Tool) => {
    // @ts-ignore
    setActiveTool(tool);
  };

  const handleClose = () => {
    setActiveTool(null);
  };

  const detailPageVariants = {
    hidden: {
      x: "100%",
      opacity: 1,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.6 }, // Duration for opening
    },
    exit: {
      x: "100%",
      opacity: 1,
      transition: { type: "tween", duration: 1 }, // Extended duration for closing
    },
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const menuFadeVariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
  };

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && !loadingMore) {
      setLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMore(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const filteredTools = useMemo(() => {
    const searchedTools = tools.filter((tool) => {
      const nameMatch = tool.fields.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = tool.fields.cardDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tool.fields.category);
      const platformMatch =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.includes(tool.fields.platform);

      return (nameMatch || descriptionMatch) && categoryMatch && platformMatch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return searchedTools.slice(0, startIndex + ITEMS_PER_PAGE);
  }, [tools, searchTerm, selectedCategories, selectedPlatforms, currentPage]);

  return (
    <Container>
      <AnimatePresence>
        {activeTool && (
          <motion.div
            variants={detailPageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 p-4 overflow-auto"
          >
            <ToolDetailPage tool={activeTool} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col min-h-full mt-[110px]">
        <div className="h-fit">
          <Carousel />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tools..."
            className="px-4 h-[54px] w-full md:w-[40%] py-3 border-[1px] rounded-md outline-none bg-black border-white mb-4"
          />
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex justify-center items-center h-[54px] w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black">
              <span className="text-lg mr-3">Filters</span>
              <FaFilter className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items
              as={motion.div}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuFadeVariants}
              className="origin-top-right overflow-hidden absolute right-0 mt-2 w-64 rounded-lg shadow-lg border border-gray-400 bg-black/20 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-10"
            >
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {["Linux", "Mac OS", "Windows", "Android", "iOS", "Crypto"].map(
                  (platform) => (
                    <label
                      key={platform}
                      className="px-6 py-5 text-md text-white cursor-pointer hover:bg-gray-200 hover:text-gray-900 flex items-center hover:bg-slate-900/50 backdrop-blur-md transition duration-300 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                        onClick={(e) => e.stopPropagation()}
                        className="mr-3 form-checkbox rounded-md h-5 w-5 text-slate"
                      />
                      {platform}
                    </label>
                  )
                )}
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTools.map((tool, index) => (
          <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} key={tool.fields.id}>
            <div
              onClick={() => handleToolSelect(tool)}
              className="flex relative cursor-pointer items-center justify-between bg-black/50 border border-gray-800 p-4 rounded-lg hover:bg-slate-900/50 backdrop-blur-md transition duration-300 ease-in-out"
            >
              <div className="flex items-center h-16 w-16 mr-8 bg-gray-900/40 rounded-sm relative">
                <Image
                  src={
                    tool.fields?.logo?.fields?.file?.url
                      ? `https://${tool.fields.logo.fields.file.url}`
                      : "/test.jpg"
                  }
                  alt={
                    tool.fields?.image?.fields?.description ||
                    "Image description"
                  }
                  layout="fill"
                  objectFit="contain"
                  className="rounded-sm"
                />
              </div>
              <h2 className="text-lg text-white font-bold flex-1">
                {tool.fields.name}
              </h2>
              <p className="text-white flex-1">{tool.fields.cardDescription}</p>
              <div className="flex-1 flex items-center justify-center">
                <p className="bg-slate-800 rounded-full px-3 py-1 text-white text-sm">
                  {tool.fields.category}
                </p>
              </div>
              <div className="flex-1 text-center text-white">
                {tool.fields.platform}
              </div>
              <div className="flex justify-center items-center w-20">
                <Tooltip
                  position="left"
                  darkBackground
                  tooltipText={tool.fields.tooltip}
                >
                  <FaInfoCircle className="text-white text-2xl cursor-pointer h-full" />
                </Tooltip>
              </div>
            </div>
          </Tilt>
        ))}
        <div ref={loader} />
        {loadingMore && <WaveLoader />}
      </div>
    </Container>
  );
};

export default PrivacyToolsSection;
