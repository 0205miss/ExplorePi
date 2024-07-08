import * as React from "react";
const SVGComponent = ({ size, height, width, ...props }) => (
  <svg
    width={size || width || 24}
    height={size || height || 24}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 0C5.56717 0 4 1.56567 4 3.49804C4 5.43041 5.56717 6.99609 7.5 6.99609C9.43283 6.99609 11 5.43041 11 3.49804C11 1.56567 9.43283 0 7.5 0Z"
    />
    <path
      d="M5.5 8.99414C3.56711 8.99414 2 10.5605 2 12.4936V14.9909H13V12.4936C13 10.5605 11.4329 8.99414 9.5 8.99414H5.5Z"
    />
  </svg>
);
export { SVGComponent as User };