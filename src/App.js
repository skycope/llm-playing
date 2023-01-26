import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import './App.css';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  input {
    width: 50%;
    padding: 20px;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #000000;
    outline: none;
  }
`;

const OutputBox = styled(animated.div)`
  background: #ffffff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #cccccc;
`;

const StyledButton = styled.button`
  background: #000000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  margin-left: 5px;
  &:hover {
    background: #555555;
  }
`;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsOutputVisible(true);
    setDisplayValue(inputValue);
    setInputValue('');
  }

  return (
    <InputContainer>
      <div className="heading">TEST</div>
      <div className="center">
        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <StyledButton type="submit">Submit</StyledButton>
        </form>
        {isOutputVisible && (
          <OutputBox className="output-box">
            {displayValue}
          </OutputBox>
        )}
      </div>
    </InputContainer>
  );
}

export default App;