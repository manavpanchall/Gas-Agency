import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import CylindersScreen from './screens/CylindersScreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/cylinders" element={<CylindersScreen />} />
          <Route path="/" element={<Landingscreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:cylinderid" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;