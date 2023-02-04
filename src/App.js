import React, { useState } from 'react';
import './App.css';
import GenerativeArt from './GenerativeArt';

// onChange is a prop that is passed to the SplitButton component
// It is a function that is called when the input value changes

function onChange(event) {
  console.log(event.target.value);
}


const SplitButton = ({ onClick, onKeyDown }) => {
  return (
    <div className="split-button">
      <input className="split-button__input" type="text" onChange={onChange} onKeyDown={onKeyDown} />
      <button className="split-button__submit" onClick={onClick}>Submit</button>
    </div>
  );
}


function App() {
  const [ball1Color, setBall1Color] = useState('');
  const [ball2Color, setBall2Color] = useState('');
  const [setIsInputFilled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // save the input value to a variable:
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    setBall1Color(randomColor1);
    setBall2Color(randomColor2);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  const handleInput = (event) => {
    if (event.target.value) {
      setIsInputFilled(true);
    } else {
      setIsInputFilled(false);
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

  // put the <GenerativeArt /> part as a background

  return (
    <>
      <div style={{ position: 'fixed', zIndex: -1, width: '100vw', height: '100vh' }}>
        <GenerativeArt />
      </div>
      <div className="App center" style={{ height: '100vh', width: '100vw' }}>
        <h1 className="heading"> How are you feeling? </h1>
        <SplitButton onClick={handleSubmit} onKeyDown={handleKeyDown} onInput={handleInput} />
        {/* <div className="ball-container" style={{ bottom: '0px' }}>
          <div className="ball" style={{ backgroundColor: ball1Color, right: '0px' }}></div>
          <div className="ball" style={{ backgroundColor: ball2Color, left: '0px' }}></div>
        </div> */}
      </div>
    </>
  );
  
  
}

export default App;