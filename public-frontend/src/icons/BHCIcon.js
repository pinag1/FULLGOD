const BHCIcon = () => (
    <svg
      id="BHC"
      data-name="BHC"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <defs>
        <style>
          {`
            #BHC .cls-1 {
              fill: none!important;
              stroke: #ccc!important;
              stroke-linecap: round;
              stroke-miterlimit: 10;
              filter: none!important;
              stroke-width: 1px!important;
            }
  
            .cls-2 {
              fill: #ccc;
            }

            #BHC{
            width: 18px; 
            height: 18px;
            margin-right: .25rem !important
            }
          `}
        </style>
      </defs>
      <circle className="cls-1" cx="7.97" cy="8" r="6.1" />
      <circle className="cls-2" cx="7.97" cy="8" r=".76" />
      <path className="cls-1" d="M8,.51v3.82M8,11.68v3.82" />
      <path className="cls-1" d="M.51,8h3.82M11.68,8h3.82" />
    </svg>
  );
  
  export default BHCIcon;