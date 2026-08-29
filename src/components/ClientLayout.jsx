'use client';

import { useEffect, useState, useCallback } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splashSeen");
    if (!seen) {
      setShowSplash(true);
    }
  }, []);

  const handleFinish = useCallback(() => {
    sessionStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleFinish} />}
      {children}
    </>
  );
}