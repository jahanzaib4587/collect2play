import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Inventory from './Pages/Maininventory/Inventory';
import BobsCollection from './Pages/Bobs_Collection/BobsCollection';
import { BrowserRouter, Route, Routes, Navigate   } from "react-router-dom";
import Home from './Pages/Home/Home';
function App() {
  return (
   <>
   <BrowserRouter>
       <Routes>
         
       {/* <Route path="/login">
          <Login />
        </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/maininventory" element={<Inventory />} />
          <Route path="/bobs_collection" element={<BobsCollection />} />
          <Route path="/home" element={<Home />} />
       </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
