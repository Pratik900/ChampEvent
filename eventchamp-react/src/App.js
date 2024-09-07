import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home";
import { PlayerRegisterForm } from "./components/PlayerRegisterForm";
import {PlayerSlotting} from "./components/PlayerSlotting";

export const App=() =>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home message="Welcome!"/>} />
          <Route path="/entryform" element={<PlayerRegisterForm />} />
          <Route path="/playerslotting" element={ <PlayerSlotting/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// export default App;
