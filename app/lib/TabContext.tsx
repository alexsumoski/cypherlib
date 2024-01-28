import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType>({
  activeTab: "home",
  setActiveTab: () => {},
});

export const useTab = () => useContext(TabContext);

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState("home");

  const setActiveTab = (tab: string) => {
    window.scrollTo(0, 0);
    setActiveTabState(tab);
  };

  useEffect(() => {
    const localActiveTab = localStorage.getItem("activeTab");
    if (localActiveTab) {
      setActiveTabState(localActiveTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
