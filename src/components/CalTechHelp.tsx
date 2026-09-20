import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CalTechHelp = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    script.onload = () => {
      if (!window.Cal) return;

      window.Cal("init", "tech-help", {
        origin: "https://app.cal.com",
      });

      window.Cal.config = window.Cal.config || {};
      window.Cal.config.forwardQueryParams = true;

      window.Cal.ns["tech-help"]("floatingButton", {
        calLink: "alyssa-gable/tech-help",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
        },
        buttonText: "Need some Tech Help?",
        buttonColor: "#ff0000",
        buttonTextColor: "#ffffff",
      });

      window.Cal.ns["tech-help"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default CalTechHelp;
