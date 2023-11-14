import './styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FormLayout} from "./layouts/FormLayout/FormLayout";
import { ReserveFormLayout } from './layouts/ReserveFormLayout/ReserveFormLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form/*" element={<FormLayout/>}/>
        <Route path="/reserve/*" element={<ReserveFormLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
