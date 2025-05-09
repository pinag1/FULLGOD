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
          <ArrowSvg inverted={false} colorArrow={true} />
          <ArrowSvg inverted={false} colorArrow={false} />
        </>
      );
    } else if (winner === 2) {
      return (
        <>
          <ArrowSvg inverted={true} colorArrow={false} />
          <ArrowSvg inverted={true} colorArrow={true} />
        </>
      );
    }
  };

  return (
    <div
      style={{
        width: "16px",
        height: "152px",
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

const ArrowSvg = ({ inverted = false, colorArrow = false }) => {
  const arrowPath = colorArrow ? (
    <path
      className="cls-1"
      d="M2,1h1.91c5.36,0,6.09,3.25,6.09,8.93v23.3c0,2.11,1.06,5.77,6.82,5.77h1.18"
    />
  ) : (
    <path
      d="M6,37.97h1.91c5.36,0,6.09-3.25,6.09-8.93,0-6.9,0-23.84,0-27.01"
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
      viewBox="0 0 20 40"
      style={{
        height: colorArrow ? "40px" : "48px",
        transform: inverted ? "scaleY(-1)" : "none",
        margin: "0",
        padding: "0",
        placeSelf: "self-end",
      }}
    >
      <defs>
        <style>
          {`
            .cls-1 {
              fill: none;
              stroke: #988dff;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: .8px;
            }
          `}
        </style>
      </defs>
      {arrowPath}
    </svg>
  );
};

export default ArrowStack;
