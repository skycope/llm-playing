import React, { useState } from 'react';
import './App.css';
import GenerativeArt from './GenerativeArt';
import CardArt from './CardArt';
import './CardArt.css';
import { CSSTransition } from 'react-transition-group';
import ArtSketch from './ArtSketch';


function onChange(event) {
  console.log(event.target.value);
}

const cardArtAnimationDuration = 300;

const SplitButton = ({ onClick, onKeyDown }) => {
  return (
    <div className="split-button">
      <input className="split-button__input" type="text" onChange={onChange} onKeyDown={onKeyDown} />
      <button className="split-button__submit" onClick={onClick}>Submit</button>
    </div>
  );
}


function App() {
  const [currentColors, setCurrentColors] = useState({ ball1Color: '', ball2Color: '' });
  // eslint disable-next-line
  const [previousColors, setPreviousColors] = useState({ ball1Color: '', ball2Color: '' });
  const [redraw, setRedraw] = useState(false);
  const [showCardArt, setShowCardArt] = useState(null);
  
  const handleClose = () => {
    setShowCardArt(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    setPreviousColors({ ball1Color: currentColors.ball1Color, ball2Color: currentColors.ball2Color });
    setCurrentColors({ ball1Color: randomColor1, ball2Color: randomColor2 });
  
    if (showCardArt) {
      setShowCardArt(false);
      setTimeout(() => {
        setShowCardArt(true);
      }, cardArtAnimationDuration);
    } else {
      setShowCardArt(true);
    }
    setRedraw(!redraw);
  };
  

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  const handleInput = (event) => {
    if (event.target.value) {
      setShowCardArt(true);
    } else {
      setShowCardArt(false);
    }
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // eslint-disable-next-line
  const cardArtTransitionStyles = {
    entering: { opacity: 0, transform: 'scale(0.9)' },
    entered: { opacity: 1, transform: 'scale(1)' },
    exiting: { opacity: 0, transform: 'scale(0.9)' },
    exited: { opacity: 0, transform: 'scale(0.9)' },
  };

  return (
    <>
      <div style={{ position: 'fixed', zIndex: -1, width: '100vw', height: '100vh' }}>
        <GenerativeArt />
      </div>
      <div className="App center" style={{ height: '100vh', width: '100vw' }}>
        <h1 className="heading"> How are you feeling? </h1>
        <SplitButton onClick={handleSubmit} onKeyDown={handleKeyDown} onInput={handleInput} />
        <div className="card-art-placeholder">
          <CSSTransition
            in={showCardArt}
            timeout={cardArtAnimationDuration}
            classNames="card-art"
            unmountOnExit
            onEntered={() => setPreviousColors(currentColors)}
          >
            <CardArt
              key={`${currentColors.ball1Color}-${currentColors.ball2Color}`}
              ball1Color={currentColors.ball1Color}
              ball2Color={currentColors.ball2Color}
              onClose={handleClose}
              redraw={redraw}
            />
          </CSSTransition>
        </div>
      </div>
    </>
  );
}

export default App;