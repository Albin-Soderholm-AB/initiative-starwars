
import './App.css';
// import Roller
import Roller from './roller.js';
import DiePicker from './diepicker.js';

// import useState and useEffect
import { useState, useCallback } from 'react';

function App() {

  // state to keep track of the skill and proficiency and name for multiple diepickers

  // state map from id to an object with skill, proficiency, and name
  const [diePickers, setDiePickers] = useState(new Map());

  const callBack = useCallback((id, skill, proficiency, name) => {
    console.log(id + ": " + name + " skill: " + skill + " proficiency: " + proficiency);
    setDiePickers(diePickers.set(id, {id: id, skill: skill, proficiency: proficiency, name: name}));
  }, [diePickers]);
  

  return (
    <div className="App">
      <header className="App-header">
        <div className='DiePickerGrid'>
        <DiePicker callBack={callBack} id="1"/>
        <Roller diePickers={diePickers}/>
        </div>
        
      </header>
    </div>
  );
}

export default App;
