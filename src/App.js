import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReserveFormLayout } from "./layouts/ReserveFormLayout/ReserveFormLayout";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ReserveFormLayout />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
