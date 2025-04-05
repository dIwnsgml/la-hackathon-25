"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders from "./ModalProviders";
import { NextStep, NextStepProvider } from "nextstepjs";
import { createContext, useEffect, useRef } from "react";
import socket from "@/utils/sockets/socket";
import { useAccount } from "@/hooks/accountHooks";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "@/utils/config";
import { TooltipProvider } from "../ui/tooltip";

//modals

export const WorkersContext = createContext({});
export const PlansContext = createContext({});
export const CallOptionsContext = createContext({});
export const ThemesContext = createContext({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failiureCount, err) => {
        console.log(err?.response?.status, "err");
        if (err?.response?.status) {
          const retryableStatusCodes = [500, 502, 503, 504, 408];
          return retryableStatusCodes.includes(err.response.status);
        }

        // Retry if it's a network error (e.g., ECONNABORTED)
        return err.message === "Network Error" || err.code === "ECONNABORTED";
      },
      retryDelay: (retryCount) => {
        return Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, etc.
      },
      gcTime: 1000 * 60 * 10,
    },
  },
});

export function AppContainer({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={config.google_client_id}>
        <TooltipProvider>
          <AppProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AppProvider>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const steps = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Welcome",
        content: "Let's get started with NextStep!",
        selector: "#step1",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      // More steps...
    ],
  },
];

function AppProvider({ children }) {
  const { accountData } = useAccount();

  useEffect(() => {
    if (!accountData) {
      socket.disconnect();
      return;
    }

    setTimeout(() => {
      socket.connect();
    }, 100);
  }, [accountData?.user_id]);

  return (
    <WorkersProvider>
      <NextStepProvider>
        <NextStep steps={steps}></NextStep>
        <ModalProviders>{children}</ModalProviders>
      </NextStepProvider>
    </WorkersProvider>
  );
}

function WorkersProvider({ children }) {
  const membersTimerWorkerRef = useRef(null);
  const subjectsTimerWorkerRef = useRef(null);

  /* useEffect(() => {
    membersTimerWorkerRef.current = new Worker(
      new URL("@/utils/workers/timerWorker.js", import.meta.url)
    );
    subjectsTimerWorkerRef.current = new Worker(
      new URL("@/utils/workers/subjectTimerWorker.js", import.meta.url)
    );

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("scope is: ", registration.scope);
        });
    }

    return () => {
      membersTimerWorkerRef.current?.terminate();
      subjectsTimerWorkerRef.current?.terminate();
    };
  }, []); */

  return (
    <WorkersContext.Provider
      value={{ membersTimerWorkerRef, subjectsTimerWorkerRef }}
    >
      {children}
    </WorkersContext.Provider>
  );
}
