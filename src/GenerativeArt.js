import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const GenerativeArt = () => {
  const sketchRef = useRef(null);


  useEffect(() => {
    new p5(p => {
      const rows = 60;
      const cols = 60;
      const red_value = Math.floor(Math.random() * 256);
      const green_value = Math.floor(Math.random() * 256);
      const blue_value = Math.floor(Math.random() * 256);

      let points;

      p.setup = function() {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(sketchRef.current);
        p.background(255, 83, 0, 100);
        points = [];
        for (let i = 0; i < rows; i++) {
          points[i] = [];
          for (let j = 0; j < cols; j++) {
            points[i][j] = {
              x: i * p.width / rows,
              y: j * p.height / cols,
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
            const angle = p.noise(x * 0.01, y * 0.01, p.frameCount * 0.01) * p.TWO_PI;
            const vx = p.cos(angle);
            const vy = p.sin(angle);
            point.x += vx;
            point.y += vy;
            point.x = p.constrain(point.x, 0, p.width);
            point.y = p.constrain(point.y, 0, p.height);
            p.stroke(255, 214, 0, 40);
            p.strokeWeight(1);
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
