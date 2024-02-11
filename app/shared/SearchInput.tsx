import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full md:w-[40%] mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tools..."
        className="px-4 h-[54px] py- border-[1px] rounded-md outline-none bg-black border-white w-full text-white"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
        >
          <MdClose className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
