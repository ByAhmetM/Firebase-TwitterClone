import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
