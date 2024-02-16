import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import {
  FaFilter,
  FaInfoCircle,
  FaGlobe,
  FaMobileAlt,
  FaDesktop,
  FaLaptop,
  FaHdd,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Tooltip from "../components/Tooltip";
import WaveLoader from "../components/WaveLoader";
import Container from "../layout/Container";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "../components/DraggableCarousel";
import ToolDetailPage from "../components/ToolsDetailPage";
import Modal from "../components/Modal";
import RequestTool from "../forms/RequestTool";
import SearchInput from "../shared/SearchInput";

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
  guides: any[];
}

const ITEMS_PER_PAGE = 20;

const PrivacyToolsSection: React.FC<PrivacyToolsSectionProps> = ({
  tools,
  guides,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTool, setActiveTool] = useState(null);

  const loader = useRef(null);

  const categories = ["Linux", "Mac OS", "Windows", "Android", "Crypto", "OS"];

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, handleClickOutside]);

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
      transition: { type: "tween", duration: 0.6 },
    },
    exit: {
      x: "100%",
      opacity: 1,
      transition: { type: "tween", duration: 1 },
    },
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

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategories((prev: any) => {
      if (prev.includes(category)) {
        return prev.filter((c: string | null) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const nameMatch = tool.fields.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = tool.fields.cardDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tool.fields.category);

      return (nameMatch || descriptionMatch) && categoryMatch;
    });
  }, [tools, searchTerm, selectedCategories]);

  const getPlatformIcons = (platforms: any) => {
    if (!platforms || platforms.length === 0) return null;

    const platformIcons = {
      Web: <FaGlobe />,
      Mobile: <FaMobileAlt />,
      PC: <FaDesktop />,
      Mac: <FaLaptop />,
      Hardware: <FaHdd />,
    };

    return (
      <div className="flex items-center gap-2">
        {platforms.map((platform: any, index: number) => (
          // @ts-ignore
          <span key={index}>{platformIcons[platform]}</span>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RequestTool onClose={() => setIsModalOpen(false)} />
      </Modal>
      <AnimatePresence>
        {activeTool && (
          <motion.div
            variants={detailPageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 overflow-auto"
          >
            <ToolDetailPage tool={activeTool} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col min-h-full mt-[110px]">
        <div className="h-fit">
          <div className="flex justify-between items-center">
            <div className=" ring-0 w-fit px-2 py-1 text-4xl">Guides</div>
          </div>
          <Carousel guides={guides} />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-1 gap-3">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Menu
            as="div"
            className="relative inline-block text-left"
            ref={dropdownRef}
          >
            <Menu.Button
              className="flex justify-center items-center h-[54px] w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-lg mr-3">Filters</span>
              <FaFilter className="w-5 h-5" />
            </Menu.Button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-right absolute right-0 mt-2 p-2 w-[350px] rounded-lg shadow-lg bg-black/50 backdrop-blur-sm border border-gray-400 ring-1 ring-black ring-opacity-5 z-10"
                >
                    <Menu.Items className="origin-top-right overflow-hidden absolute right-0 mt-2 p-2 w-[350px] rounded-lg shadow-lg bg-black/50 backdrop-blur-sm border border-gray-400 ring-1 ring-black ring-opacity-5 z-10">
                      <div
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <p className="my-2 ms-1">Categories</p>
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={`px-5 py-2 m-1 rounded-full text-md font-medium transition duration-300 ease-in-out ${
                              selectedCategories.includes(category)
                                ? "bg-purple-500 border border-purple-500 text-white"
                                : "bg-black text-white border border-white"
                            }`}
                            onClick={() =>
                              handleCategorySelect(
                                category === "All" ? null : category
                              )
                            }
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </Menu.Items>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Menu>
          </div>
          <div className="w-48 -translate-y-6">
              <p className="font-thin pb-2">Think a tool should be added?</p>
              <button
                className="underline"
                onClick={() => setIsModalOpen(true)}
              >
                Request a new tool
              </button>
            </div>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTools.map((tool, index) => (
          <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} key={tool.fields.id}>
            <div
              onClick={() => handleToolSelect(tool)}
              className="relative cursor-pointer bg-black/50 border border-gray-800 rounded-lg hover:bg-slate-900/50 backdrop-blur-md transition duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center p-4 sm:hidden">
                <div className="flex items-center justify-start w-full mb-2">
                  <div className="h-16 w-16 bg-gray-900/40 rounded-sm mr-4">
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
                      className="rounded-md !relative"
                    />
                  </div>
                  <h2 className="text-lg text-white font-bold mr-3">
                    {tool.fields.name}
                  </h2>
                </div>
                <div className="w-full">
                  <p className="text-white py-2">
                    {tool.fields.cardDescription}
                  </p>
                  <div className="mt-2">
                    <p className="bg-slate-800 bg-sla rounded-full px-3 py-1 text-white text-sm w-fit">
                      {tool.fields.category}
                    </p>
                  </div>
                </div>
              </div>

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
                        tool.fields?.image?.fields?.description ||
                        "Image description"
                      }
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg !relative"
                    />
                  </div>
                  <h2 className="text-lg text-white font-bold mr-6 flex-1">
                    {tool.fields.name}
                  </h2>
                  <p className="text-white flex-1">
                    {tool.fields.cardDescription}
                  </p>
                  <div className="flex items-center flex-1">
                    <p className="bg-slate-800 rounded-full px-3 py-1 text-white text-sm mr-4">
                      {tool.fields.category}
                    </p>
                    {getPlatformIcons(tool.fields.platform)}
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
        ))}
        <div ref={loader} />
        {loadingMore && <WaveLoader />}
      </div>
    </Container>
  );
};

export default PrivacyToolsSection;
