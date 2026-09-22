import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CalBookingButtons = () => {
  useEffect(() => {
    if (window.Cal) {
      initializeNamespaces();
      return;
    }

    const bootstrap = document.createElement("script");

    bootstrap.type = "text/javascript";
    bootstrap.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) {
          a.q.push(ar);
        };

        let d = C.document;

        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;

          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];

            d.head.appendChild(
              d.createElement("script")
            ).src = A;

            cal.loaded = true;
          }

          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };

            const namespace = ar[1];

            api.q = api.q || [];

            if (typeof namespace === "string") {
              cal.ns[namespace] =
                cal.ns[namespace] || api;

              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }

            return;
          }

          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    `;

    document.head.appendChild(bootstrap);

    // Wait for the Cal bootstrap to create window.Cal
    const timer = setInterval(() => {
      if (window.Cal) {
        clearInterval(timer);
        initializeNamespaces();
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  function initializeNamespaces() {
    if (!window.Cal) return;

    window.Cal("init", "tech-help", {
      origin: "https://app.cal.com",
    });

    window.Cal("init", "ewaste-pickup", {
      origin: "https://app.cal.com",
    });

    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;

    window.Cal.ns["tech-help"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    window.Cal.ns["ewaste-pickup"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      style={{
        width: "150px",
      }}
    >
      <button
        type="button"
        data-cal-link="alyssa-gable/tech-help"
        data-cal-namespace="tech-help"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        style={{
          width: "100%",
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

      <button
        type="button"
        data-cal-link="alyssa-gable/ewaste-pickup"
        data-cal-namespace="ewaste-pickup"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        style={{
          width: "100%",
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
        ♻ TECH PICKUP
      </button>
    </div>
  );
};

export default CalBookingButtons;
