const BigArrowStack = ({ winner }) => {
  const renderArrow = () => {
    if (winner === 0) {
      return (
        <>
          <BigArrowSvg inverted={false} colorArrow={false} />{" "}
          {/* Inverted Gray Arrow */}
          <BigArrowSvg inverted={true} colorArrow={false} />{" "}
          {/* Normal Gray Arrow */}
        </>
      );
    } else if (winner === 1) {
      return (
        <>
          <BigArrowSvg inverted={true} colorArrow={true} />{" "}
          {/* Normal Color Arrow */}
          <BigArrowSvg inverted={true} colorArrow={false} />{" "}
          {/* Normal Gray Arrow */}
        </>
      );
    } else if (winner === 2) {
      return (
        <>
          <BigArrowSvg inverted={false} colorArrow={false} />{" "}
          {/* Inverted Gray Arrow */}
          <BigArrowSvg inverted={false} colorArrow={true} />{" "}
          {/* Inverted Color Arrow */}
        </>
      );
    }
  };

  return (
    <div
      style={{
        width: "16px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: "0",
        marginTop: "24px",
      }}
    >
      {renderArrow()}
    </div>
  );
};

const BigArrowSvg = ({ inverted = false, colorArrow = false }) => {
  const arrowPath = colorArrow ? (
    <path
      className="cls-1"
      d="M2,116.5h1.91c5.36,0,6.09-3.25,6.09-8.93,0-6.9,0-95.13,0-98.3,0-2.11,1.06-5.77,6.82-5.77h1.18"
    />
  ) : (
    <path
      d="M6,4.53h1.91c5.36,0,6.09,3.25,6.09,8.93,0,6.9,0,98.84,0,102.01"
      fill="none"
      stroke="#7f7f7f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth=".8"
    />
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 120"
      style={{
        height: "120px",
        width: "20px",
        transform: inverted ? "scaleY(-1)" : "none",
        margin: "0",
        padding: "0",
        placeSelf: colorArrow ? "anchor-center" : "self-end",
      }}
    >
      <defs>
        <style>
          {`
              .cls-1 {
                fill: none;
                stroke: ${colorArrow ? "#988dff" : "#7f7f7f"};
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: .8px;
              }
            `}
        </style>
      </defs>
      {arrowPath} {/* Render the appropriate arrow path */}
    </svg>
  );
};

export default BigArrowStack;
