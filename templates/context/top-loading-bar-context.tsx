import LoadingBar from "@/components/ui/loading-bar";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

interface LoadingProviderProps {
  children: ReactNode;
  color?: string; // Color for the loading bar
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  color = "#007AFF", // Default blue color
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && <LoadingBar color={color} />}
    </LoadingContext.Provider>
  );
};

export const useTopLoadingBar = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
