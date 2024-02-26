import React from "react";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const DonationCard: React.FC = () => {
  const walletAddress = "158WQCp9fHmzY7K11LAF4axcnoh5rfKTc3";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy.");
      });
  };

  return (
    <div className="relative max-w-sm mb-8 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Donate Bitcoin</h3>
      <p className="mb-4 text-sm">
        Support Cypherlib by donating to our Bitcoin wallet:
      </p>
      <div
        className="flex justify-between items-center bg-black/50 border-[1px] p-4 cursor-pointer terminal-style border-[#ff6666]"
        onClick={copyToClipboard}
      >
        <span className="me-4 font-normal text-md">{walletAddress}</span>
        <CopyIcon
          width={20}
          height={20}
          className="absolute right-5 terminal-style"
        />
      </div>
    </div>
  );
};

export default DonationCard;
