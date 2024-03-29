import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaLink,
} from "react-icons/fa";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Button from "../shared/Button";

// @ts-ignore
const ToolDetailPage = ({ tool, onClose }) => {
  if (!tool) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 style={{ color: "blue", fontSize: "7em" }}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2
          style={{
            color: "white",
            fontSize: "1.5em",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          {children}
        </h2>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p style={{ color: "white", fontSize: "1em" }}>{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const {
          file: { url, contentType },
        } = node.data.target.fields;
        if (contentType.includes("video")) {
          return <video src={url} controls style={{ maxWidth: "100%" }} />;
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} style={{ color: "royalblue" }}>
          {children}
        </a>
      ),
    },
  };

  const richTextContent = tool.fields.content
    ? documentToReactComponents(tool.fields.content, options)
    : null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.5 }}
      className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-3xl p-6 md:p-16 lg:p-20 overflow-auto"
    >
      <div className="flex justify-between items-start">
        <button
          onClick={onClose}
          className="text-xl p-4 absolute m-2 bg-slate-300/20 rounded-full hover:bg-slate-300/30 backdrop-blur-xl hover:-translate-x-1 transition-all ease-in-out duration-200"
        >
          <FaArrowLeft />
        </button>
        {/* Add more top right buttons if needed */}
      </div>

      {/* Hero Image Section */}
      {/* {tool.fields.image && (
        <img
          src={`https://${tool.fields.image.fields.file.url}`}
          alt={tool.fields.image.fields.description || "Tool Image"}
          className="w-full object-contain rounded-2xl"
        />
      )} */}

      <div className="content flex flex-col mt-28 w-full">
        <div className="flex justify-between flex-col md:flex-row">
          <h1 className="text-2xl md:text-3xl font-bold my-4">
            {tool.fields.name}
          </h1>
          <div className="flex items-center gap-4">
            {tool.fields.url && (
              <Button
                onClick={() => window.open(tool.fields.website, "_blank")}
                icon={<FaExternalLinkAlt />}
              >
                Website
              </Button>
            )}

            {tool.fields.github && (
              <Button
                onClick={() => window.open(tool.fields.github, "_blank")}
                icon={<FaGithub />}
              >
                GitHub
              </Button>
            )}

            {tool.fields.docs && (
              <Button
                onClick={() => window.open(tool.fields.docs, "_blank")}
                icon={<FaFileAlt />}
              >
                Docs
              </Button>
            )}
          </div>
        </div>
        <div className="my-10">{richTextContent}</div>
      </div>
    </motion.div>
  );
};

export default ToolDetailPage;
