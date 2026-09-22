const CalEwastePickup = () => {
  return (
    <button
      type="button"
      data-cal-link="alyssa-gable/ewaste-pickup"
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
      ♻ TECH PICKUP
    </button>
  );
};

export default CalEwastePickup;
