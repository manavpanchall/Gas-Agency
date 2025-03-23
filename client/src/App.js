import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingscreen />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/book/:cylinderid" element={<Bookingscreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/profile" element={<Profilescreen />} />
      </Routes>
    </div>
  );
}

export default App;