import React, { useState } from 'react';
import { CopyIcon } from '@radix-ui/react-icons';

const DonationCard: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = '158WQCp9fHmzY7K11LAF4axcnoh5rfKTc3';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Message will fade out after 2 seconds
  };

  return (
    <div className="max-w-sm text-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Donate Bitcoin</h3>
      <p className="mb-4">Support us by donating to our Bitcoin wallet:</p>
      <div 
        className="flex justify-between items-center bg-gray-700 p-2 rounded cursor-pointer"
        onClick={copyToClipboard}
      >
        <span className='me-4'>{walletAddress}</span>
        <CopyIcon className="w-6 h-6" />
      </div>
      <div 
        className={`mt-2 text-sm text-green-400 transition-opacity duration-200 ${isCopied ? 'opacity-1' : 'opacity-0'}`}
      >
        Copied to clipboard!
      </div>
    </div>
  );
};

export default DonationCard;
