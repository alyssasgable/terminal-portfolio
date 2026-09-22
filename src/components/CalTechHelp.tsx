import { useEffect } from "react";

const CalTechHelp = () => {
  useEffect(() => {
    if (document.getElementById("cal-embed-script")) return;

    const script = document.createElement("script");

    script.id = "cal-embed-script";
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Don't remove the shared Cal.com script.
    };
  }, []);

  return (
    <button
      type="button"
      data-cal-link="alyssa-gable/tech-help"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className="w-full"
      style={{
        background: "#000000",
        color: "#4ade80",
        border: "1px solid #4ade80",
        padding: "10px 16px",
        fontFamily: "monospace",
        fontSize: "13px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      &gt; TECH HELP?
    </button>
  );
};

export default CalTechHelp;
