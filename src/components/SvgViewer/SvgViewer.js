import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function SvgViewer({ link, marks }) {
  const [tspans, setTspans] = useState();
  const svgRef = useRef(null);
  console.log({ marks });
  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        svgRef.current.innerHTML = res.data;
        setTspans(document.querySelectorAll('tspan'));
      })
      .catch((err) => console.log({ err }));
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

  return <div ref={svgRef}>SvgViewer</div>;
}

export default SvgViewer;
