
import './App.css';
// import Roller
import Page from './Page.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './navbar/navBar';

function App() {

  // state to keep track of the skill and proficiency and name for multiple diepickers

  // state map from id to an object with skill, proficiency, and name
  


  return (
    <div className="App">
      <header className="App-header">
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        

        <div className='title'>
          <p><a href={window.location.pathname}>Star Wars Initiative</a></p>
        </div>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/cool" element={<Page cool></Page>}>

            </Route>
            <Route path="/" element={<Page></Page>}>
            </Route>
          </Routes>
        </BrowserRouter>


      </header>
    </div>
  );
}

export default App;
