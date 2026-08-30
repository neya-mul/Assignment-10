'use client';

import { useEffect, useState, useCallback } from "react";
import SplashScreen from "./SplashScreen";
import WelcomeNotificationHost from "./WelcomeNotificationHost";

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splashSeen");
    if (!seen) {
      const timer = setTimeout(() => setShowSplash(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFinish = useCallback(() => {
    sessionStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleFinish} />}
      <WelcomeNotificationHost />
      {children}
    </>
  );
}