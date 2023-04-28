import logo from './logo.svg';
import './App.css';
// import Roller
import Roller from './roller.js';
import DiePicker from './diepicker.js';

// import useState and useEffect
import { useState, useEffect, useCallback } from 'react';

function App() {

  // state to keep track of the skill and proficiency and name for multiple diepickers

  const callBack = useCallback((skill, proficiency, name) => {
    console.log(name + " skill: " + skill + " proficiency: " + proficiency);
  });
  

  return (
    <div className="App">
      <header className="App-header">
        <div className='DiePickerGrid'>
        <DiePicker callBack={callBack}/>
        <Roller />
        </div>
        
      </header>
    </div>
  );
}

export default App;
