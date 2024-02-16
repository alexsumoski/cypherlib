"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative max-w-[2520px] xl:px-20 md:px-8 sm:px-6 px-4 py-6">
      {children}
    </div>
  );
};

export default Container;
