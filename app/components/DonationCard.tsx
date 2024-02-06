import React, { useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";

const DonationCard: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "158WQCp9fHmzY7K11LAF4axcnoh5rfKTc3";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Message will fade out after 2 seconds
  };

  return (
    <div className="card max-w-sm mb-8 text-white rounded-lg shadow-md">
      <div>
        <p className="mb-4 text-sm z-10">
          Support Cypherlib by donating to our Bitcoin wallet:
        </p>
        <div
          className="flex justify-between items-center bg-gray-800 p-2 rounded cursor-pointer"
          onClick={copyToClipboard}
        >
          <span className="me-4 font-normal text-sm">{walletAddress}</span>
          <CopyIcon className="w-6 h-6" />
        </div>
        <div
          className={`mt-2 text-sm font-normal text-green-400 transition-opacity duration-200 ${
            isCopied ? "opacity-1" : "opacity-0"
          }`}
        >
          Copied to clipboard!
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
