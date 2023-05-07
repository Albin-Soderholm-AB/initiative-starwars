
import './App.css';
// import Roller
import Page from './Page.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './navbar/navBar';

function App() {

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
            <Route path="/vig" element={<Page></Page>}>
            </Route>
            <Route path="/shared" element={<Page useStorage></Page>}></Route>
            <Route path="/" element={<Page useStorage></Page>}></Route>
          </Routes>
        </BrowserRouter>


      </header>
    </div>
  );
}

export default App;
