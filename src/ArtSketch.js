import React, { useEffect, useRef } from 'react';
import Sketch from 'react-p5';

const ArtSketch = ({ ball1Color, ball2Color, redraw }) => {
  const p5Ref = useRef();

  const setup = (p5, canvasParentRef) => {
    p5Ref.current = p5;
    const containerWidth = canvasParentRef.offsetWidth;
    const containerHeight = canvasParentRef.offsetHeight;
    p5.createCanvas(containerWidth, containerHeight).parent(canvasParentRef);
    p5.background(255);
    p5.noLoop();
  };

  const draw = (p5) => {
    const tileSize = 40;
    const numTiles = p5.width / tileSize;

    for (let x = 0; x < numTiles; x++) {
      for (let y = 0; y < numTiles; y++) {
        const tileX = x * tileSize;
        const tileY = y * tileSize;

        const noiseVal = p5.noise(
          tileX / 100,
          tileY / 100,
          p5.frameCount / 100
        );

        const color1 = p5.color(ball1Color);
        const color2 = p5.color(ball2Color);
        // make the shapeColor more extreme (closer to 0 or 1)
        const shapeColor = p5.lerpColor(color1, color2, noiseVal * noiseVal);

        p5.stroke(0);
        p5.strokeWeight(1);
        p5.fill(shapeColor);

        const centerX = tileX + tileSize / 2;
        const centerY = tileY + tileSize / 2;
        const shapeSize = tileSize * 0.9 * noiseVal;

        const numSides = Math.floor(p5.map(noiseVal, 0, 1, 5, 10));
        const angleStep = p5.TWO_PI / numSides;

        const points = [];

        for (let angle = 0; angle < p5.TWO_PI; angle += angleStep) {
          const noiseSize = shapeSize * (0.5 + 0.5 * noiseVal);
          const size = noiseSize + tileSize * 0.2 * noiseVal;

          const x = centerX + p5.cos(angle) * size;
          const y = centerY + p5.sin(angle) * size;

          points.push({ x, y });
        }

        // Connect points
        p5.beginShape();
        for (let i = 0; i < points.length; i++) {
          const currPoint = points[i];
          p5.vertex(currPoint.x, currPoint.y);
        }
        p5.endShape(p5.CLOSE);
      }
    }
  };

  useEffect(() => {
    if (redraw && p5Ref.current) {
      p5Ref.current.loop();
    }
  }, [redraw]);

  return <Sketch setup={setup} draw={draw} />;
};

export default ArtSketch;
