import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainMenu } from './MainMenu';
import { Story } from './Story';
import { Recorder } from './Recorder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/story" element={<Story />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
        <Route path="/recorder" element={<Recorder setTranscriptionCallback={(text) => {}}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
