"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          // Base
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "#fff",

          /* // Success
          "--success-bg": "var(--success-bg, #fff)", 
          "--success-text": "var(--success-text, #fff)", // fallback to green-800
          "--success-border": "var(--success-border, #fff)",

          // Error
          "--error-bg": "var(--error-bg, #fff)",
          "--error-text": "var(--error-text, #991b1b)",
          "--error-border": "var(--error-border, #fff)",

          // Warning
          "--warning-bg": "var(--warning-bg, #fff)",
          "--warning-text": "var(--warning-text, #92400e)",
          "--warning-border": "var(--warning-border, #fff)",

          // Info / loading (if needed)
          "--info-bg": "var(--info-bg, #fff)",
          "--info-text": "var(--info-text, #075985)",
          "--info-border": "var(--info-border, #fff)", */
        } as React.CSSProperties
      }
      duration={600000}
      {...props}
    />
  );
};

export { Toaster };
