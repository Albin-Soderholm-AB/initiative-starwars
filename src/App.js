
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


  const callBack = useCallback((id, skill, proficiency, name) => {
    setDiePickers(diePickers.set(id, {id: id, skill: skill, proficiency: proficiency, name: name}));
  }, [diePickers]);

  const rollCallBack = useCallback(() => {
    setShowPickers(false);
  }, []);

  useEffect (() => {
  }, [showPickers, diePickers]);
  

  return (
    <div className="App">
      <header className="App-header">
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <div className='title'>
          <p><a href="/">Star Wars Initiative</a></p>
        </div>

        <div>
          <Roller diePickers={diePickers} callBack={rollCallBack} showResult={!showPickers}/>
        </div>
        <div className="DiePickerGrid">
          <DiePicker callBack={callBack} show={showPickers} id="1" initName="Goon" initProf={3}/>
          <DiePicker callBack={callBack} show = {showPickers} id="2" initName="Baddie" initProf={2}/>
          <DiePicker callBack={callBack} show = {showPickers} id="3" initName="Boss"/>
          <DiePicker callBack={callBack} show = {showPickers} id="4" initName="Slapboi"/>
          <DiePicker callBack={callBack} show = {showPickers} id="5" initName="Goomboi Advance"/>
          <DiePicker callBack={callBack} show = {showPickers} id="5" initName="Goomboi Color"/>

          <DiePicker callBack={callBack} show = {false} id="6" initName="P1" initSkill={1}/>
          <DiePicker callBack={callBack} show = {false} id="7" initName="P2" initSkill={1}/>
          <DiePicker callBack={callBack} show = {false} id="8" initName="P3" initSkill={1}/>
          <DiePicker callBack={callBack} show = {false} id="9" initName="P4" initSkill={1}/>
          <DiePicker callBack={callBack} show = {false} id="10" initName="P5" initSkill={1}/>


        
        </div>
        
      </header>
    </div>
  );
}

export default App;
