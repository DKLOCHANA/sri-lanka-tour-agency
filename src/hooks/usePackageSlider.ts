import { useState, useEffect, useCallback } from 'react';

export const usePackageSlider = (packagesLength: number) => {
  const [currentPackage, setCurrentPackage] = useState(0);

  // Auto-slide packages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPackage((prev) => (prev + 1) % packagesLength);
    }, 6000);
    return () => clearInterval(interval);
  }, [packagesLength]);

  const nextPackage = useCallback(() => {
    setCurrentPackage((prev) => (prev + 1) % packagesLength);
  }, [packagesLength]);

  const prevPackage = useCallback(() => {
    setCurrentPackage((prev) => (prev - 1 + packagesLength) % packagesLength);
  }, [packagesLength]);

  return {
    currentPackage,
    setCurrentPackage,
    nextPackage,
    prevPackage
  };
};