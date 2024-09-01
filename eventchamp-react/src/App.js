import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home";
import { PlayerRegisterForm } from "./components/PlayerRegisterForm";

export const App=() =>{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entryform" element={<PlayerRegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// export default App;
