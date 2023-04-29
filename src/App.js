
import './App.css';
// import Roller
import Roller from './roller.js';
import DiePicker from './diepicker.js';

// import useState and useEffect
import { useState, useCallback, useEffect } from 'react';

function App() {

  // state to keep track of the skill and proficiency and name for multiple diepickers

  // state map from id to an object with skill, proficiency, and name
  const [diePickers, setDiePickers] = useState(new Map());

  const [showPickers, setShowPickers] = useState(true);

  const [update, setUpdate] = useState(0);

  const callBack = useCallback((id, skill, proficiency, name) => {
    console.log(id + ": " + name + " skill: " + skill + " proficiency: " + proficiency);
    setDiePickers(diePickers.set(id, {id: id, skill: skill, proficiency: proficiency, name: name}));
    setUpdate(update + 1);
  }, [diePickers, update]);

  const rollCallBack = useCallback(() => {
    setShowPickers(false);
    setUpdate(update + 1);
  }, [update]);

  useEffect (() => {
  }, [showPickers, diePickers]);
  

  return (
    <div className="App">
      <header className="App-header">
      
        <div>
          <Roller diePickers={diePickers} callBack={rollCallBack} showResult={!showPickers}/>
        </div>
        <div className="DiePickerGrid">
          <DiePicker callBack={callBack} show={showPickers} id="1"/>
          <DiePicker callBack={callBack} show = {showPickers} id="2"/>
        
        </div>
        
      </header>
    </div>
  );
}

export default App;
