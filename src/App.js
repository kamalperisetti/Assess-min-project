import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Questions from "./components/questions";
import Instructions from "./components/Instructions";
import PageNotFound from "./components/Pagrnotfound";
import TimeUp from "./components/Timeup";
import SubmitAssessment from "./components/Submitpage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Instructions />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/timeup" element={<TimeUp />} />
            <Route path="/submited" element={<SubmitAssessment />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
