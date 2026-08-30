"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import WelcomeNotification from "./WelcomeNotification";
import {
  consumeWelcomeTrigger,
  clearWelcomeTrigger,
  EVENT_NAME,
} from "@/lib/welcome-notification";

/**
 * WelcomeNotificationHost
 *
 * Listens for one-time login events and renders the WelcomeNotification banner.
 * Guarantees that notifications are shown strictly upon a successful login,
 * and never upon simple page refreshes or route changes.
 */
export default function WelcomeNotificationHost() {
  const [welcomeUser, setWelcomeUser] = useState(null);
  const isSocialPendingRef = useRef(false);
  const activeTimerRef = useRef(null);

  // Hook into better-auth session to resolve social login user info if needed
  const { data: session } = authClient.useSession();

  const handleClose = useCallback(() => {
    setWelcomeUser(null);
    clearWelcomeTrigger();
    if (activeTimerRef.current) {
      clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }
  }, []);

  const triggerForUser = useCallback((name) => {
    if (!name && name !== "") return;
    setWelcomeUser(name);
  }, []);

  // 1. Check for single-use sessionStorage trigger on initial mount / navigation
  useEffect(() => {
    const trigger = consumeWelcomeTrigger();
    if (!trigger) return;

    if (trigger.isSocial) {
      // Flag pending social login until session is resolved
      isSocialPendingRef.current = true;
    } else {
      const timer = setTimeout(() => {
        triggerForUser(trigger.userName || "Athlete");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [triggerForUser]);

  // 2. Resolve social login once session data is available
  useEffect(() => {
    if (isSocialPendingRef.current && session?.user) {
      isSocialPendingRef.current = false;
      const timer = setTimeout(() => {
        triggerForUser(session.user.name || session.user.email?.split("@")[0] || "Athlete");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [session, triggerForUser]);

  // 3. Listen for window-level custom events (for instant in-memory triggers)
  useEffect(() => {
    const onWelcomeEvent = (e) => {
      const { userName } = e.detail || {};
      // Also consume any storage token just in case
      consumeWelcomeTrigger();
      triggerForUser(userName || "Athlete");
    };

    window.addEventListener(EVENT_NAME, onWelcomeEvent);
    return () => {
      window.removeEventListener(EVENT_NAME, onWelcomeEvent);
    };
  }, [triggerForUser]);

  return (
    <AnimatePresence mode="wait">
      {welcomeUser !== null && (
        <WelcomeNotification
          key={`welcome-${welcomeUser}`}
          userName={welcomeUser}
          onClose={handleClose}
          duration={3800}
        />
      )}
    </AnimatePresence>
  );
}
