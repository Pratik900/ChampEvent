import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home/Home";
import { PlayerRegisterForm } from "./components/Players/PlayerRegisterForm";
import { PlayerSlotting } from "./components/Players/PlayerSlotting";
import { SinglesSlotting } from "./components/Players/SinglesSlotting";
import { DoublesSlotting } from "./components/Players/DoublesSlotting";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home message="Welcome!" />} />
          <Route path="/entryform" element={<PlayerRegisterForm />} />
            <Route
              path="/playerslotting/singlesslotting"
              element={<SinglesSlotting />}
            ></Route>
          <Route path="/playerslotting" element={<PlayerSlotting />}>
          </Route>
            <Route
              path="/playerslotting/doublesslotting"
              element={<DoublesSlotting />}
            ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

// export default App;
