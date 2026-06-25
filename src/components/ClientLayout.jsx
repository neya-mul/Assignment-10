'use client';

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
// import SplashScreen from "@/components/SplashScreen";

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("splashSeen");
    if (seen) setShowSplash(false);
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleFinish} />}
      {children}
    </>
  );
}