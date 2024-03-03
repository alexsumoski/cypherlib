import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

interface RequestToolInterface {
  onClose: any;
}

const categories = [
  { id: "1", name: "Linux" },
  { id: "2", name: "Mac OS" },
];

const RequestTool: React.FC<RequestToolInterface> = ({ onClose }) => {
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toolName || !category || !website) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true); // Start loading

    const templateParams = {
      toolName,
      category,
      website,
    };

    emailjs
      .send(
        "service_m31cssp",
        "template_3qa16x4",
        templateParams,
        "-fmfFCbmQ9UCfb4mn"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          onClose();
          toast.success("Request submitted successfully!");
          setToolName("");
          setCategory("");
          setWebsite("");
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Failed to send request.");
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>
      <h2 className="text-4xl py-4">Request a new privacy tool</h2>
      <input
        className="bg-black text-white p-2 rounded border-[1px] border-white"
        placeholder="Tool Name"
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
      />

      <input
        className="bg-black text-white p-2 rounded border-[1px] border-white"
        placeholder="Website or Link"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <div className="select-wrapper">
        <select
          className="bg-black text-white p-2 rounded border-[1px] border-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-white h-[40px] text-black p-2 rounded-full my-4 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? <div className="spinner" /> : "Submit"}
      </button>
      <p className="text-white mt-4">
        Or email us directly at{" "}
        <a
          href="mailto:cypherlib@proton.me"
          className="underline font-thin terminal-style"
        >
          cypherlib@proton.me
        </a>
      </p>
    </form>
  );
};

export default RequestTool;
