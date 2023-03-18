import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const GenerativeArt = () => {
  const sketchRef = useRef(null);


  useEffect(() => {
    new p5(p => {
      const rows = 100;
      const cols = 100;
      const red_1_value = Math.floor(Math.random() * 256);
      const green_1_value = Math.floor(Math.random() * 256);
      const blue_1_value = Math.floor(Math.random() * 256);

      const red_2_value = Math.floor(Math.random() * 256);
      const green_2_value = Math.floor(Math.random() * 256);
      const blue_2_value = Math.floor(Math.random() * 256);

      let points;

      p.setup = function() {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(sketchRef.current);
        p.background('black');
        points = [];
        for (let i = 0; i < rows; i++) {
          points[i] = [];
          for (let j = 0; j < cols; j++) {
            points[i][j] = {
              x: i * (p.width / rows)+(Math.floor(Math.random() * (20) ) - 10),
              y: j * (p.height / cols)+(Math.floor(Math.random() * (20) ) - 10),
            };
          }
        }
      };

      p.draw = function() {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const point = points[i][j];
            const x = point.x;
            const y = point.y;
            const angle = p.noise(x * 0.005, y * 0.005, p.frameCount * 0.0) * p.TWO_PI*2;
            const vx = p.cos(angle);
            const vy = p.sin(angle);
            point.x += vx;
            point.y += vy;
            point.x = p.constrain(point.x, 0, p.width);
            point.y = p.constrain(point.y, 0, p.height);
            // set point colour based on position
            const red_value = p.map(point.x, 0, p.width, red_1_value, red_2_value);
            const green_value = p.map(point.y, 0, p.height, green_1_value, green_2_value);
            const blue_value = p.map(point.x, 0, p.width, blue_1_value, blue_2_value);
            p.stroke(red_value, green_value, blue_value, 100);
            p.strokeWeight(Math.random()*0.5+1);
            p.line(x, y, point.x, point.y);
          }
        }
    if (p.frameCount === 1000) {
            p.noLoop();
          }
      };
    }, sketchRef.current);
  }, []);

  return (
    <div ref={sketchRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default GenerativeArt;
