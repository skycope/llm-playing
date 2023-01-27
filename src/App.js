import React, { useState } from 'react';
import './App.css';


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
  const [backgroundColor, setBackgroundColor] = useState('');
  const [setIsInputFilled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const randomColor = getRandomColor();
    setBackgroundColor(randomColor);
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

  return (
    <div className="App center" style={{ backgroundColor, height: '100vh', width: '100vw' }}>
      <h1 className="heading">How are you feeling?</h1>
      <SplitButton onClick={handleSubmit} onKeyDown={handleKeyDown} onInput={handleInput} />
    </div>
  );
}

export default App;