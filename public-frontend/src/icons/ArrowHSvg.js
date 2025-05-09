const ArrowStack = ({ winner }) => {
  const renderArrow = () => {
    if (winner === 0) {
      return (
        <>
          <ArrowSvg inverted={true} />
          <ArrowSvg inverted={false} />
        </>
      );
    } else if (winner === 1) {
      return (
        <>
          <ArrowSvg colorArrow={true} />
          <ArrowSvg />
        </>
      );
    } else if (winner === 2) {
      return (
        <>
          <ArrowSvg inverted={true} />
          <ArrowSvg inverted={true} colorArrow={true} />
        </>
      );
    }
  };

  return (
    <div
      style={{
        width: "140px",
        height: "16px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "15px",
        marginTop: "24px",
      }}
    >
      {renderArrow()}
    </div>
  );
};

const ArrowSvg = ({ inverted = false, colorArrow = false }) => {
  const strokeColor = colorArrow ? "#988dff" : "#7f7f7f";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="6"
      viewBox="0 0 40 6"
      style={{
        height: "48px",
        transform: inverted ? "scaleY(-1)" : "none",
        margin: "0",
        padding: "0",
        marginLeft: "15px",
      }}
    >
      <line
        x1="0"
        y1="3"
        x2="40"
        y2="3"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowStack;
