const SwordIcon = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 26 26"
    width="32"
    height="32"
  >
    <defs>
      <style>{`
        .cls-1 {
          fill: #ccc;
          filter: url(#outer-glow-1);
        }
      `}</style>
      <filter
        id="outer-glow-1"
        x="-3"
        y="-3"
        width="38"
        height="38"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="0" dy="0" />
        <feGaussianBlur result="blur" stdDeviation="2" />
        <feFlood floodColor="#000" floodOpacity=".15" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <path
      className="cls-1"
      d="M9.73,14.76l-6.73-6.73V3h5.05l6.71,6.72-5.04,5.04ZM24.98,22.96l3.52-3.52-2.01-2.01-2.01,2.01-2.21-2.21-5.03,5.04,2.22,2.22-1.97,1.97,2,2,3.46-3.46,3.99,3.99,2.07-2.02-4.02-4.02ZM29,8.02V3h-5.05L7.52,19.45l-2.01-2.01-2.01,2.01,3.52,3.52-4.02,4.02,2.07,2.02,3.99-3.99,3.46,3.46,2-2-1.97-1.97L29,8.02Z"
    />
  </svg>
);

export default SwordIcon;
