import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function SvgViewer({ link, marks }) {
  const [tspans, setTspans] = useState();
  const svgRef = useRef(null);
  useEffect(() => {
    svgRef.current.innerHTML = `<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"
  width='100'>
  <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.1"/>
  </circle>
  <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.2"/>
  </circle>
  <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.3"/>
  </circle>
</svg>`;
    if (link) {
      axios
        .get(link)
        .then((res) => {
          svgRef.current.innerHTML = res.data;
          setTspans(document.querySelectorAll('tspan'));
        })
        .catch((err) => console.log({ err }));
    }
  }, [link]);
  useEffect(() => {
    if (tspans && marks) {
      tspans.forEach((el) => {
        if (marks[el.id]) {
          document.querySelector(`#${el.id}`).textContent = marks[el.id];
        }
      });
    }
  }, [tspans]);

  return <div ref={svgRef}></div>;
}

export default SvgViewer;
