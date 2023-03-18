import React from 'react';
import './CardArt.css';
import ArtSketch from './ArtSketch';
  
const CardArt = ({ ball1Color, ball2Color, onClose, redraw }) => {
    const setup = (p5, canvasParentRef) => {
        const containerWidth = canvasParentRef.offsetWidth;
        const containerHeight = canvasParentRef.offsetHeight;
        p5.createCanvas(containerWidth, containerHeight).parent(canvasParentRef);
        p5.background(255);
        p5.noLoop();
      };

  return (
    <div className="card-art-container">
      <div className="card-art">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="color-item">
          <div
            className="color-circle"
            style={{ backgroundColor: ball1Color }}
          ></div>
          <div className="color-name">{ball1Color}</div>
        </div>
        <div className="color-item">
          <div
            className="color-circle"
            style={{ backgroundColor: ball2Color }}
          ></div>
          <div className="color-name">{ball2Color}</div>
        </div>
        <ArtSketch
        ball1Color={ball1Color}
        ball2Color={ball2Color}
        redraw={redraw}
        />      </div>
    </div>
  );
};

export default CardArt;
