"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="relative px-5 md:px-8 xl:px-20 py-6">{children}</div>;
};

export default Container;
