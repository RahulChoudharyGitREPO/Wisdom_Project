import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/Homepage";
import UserDetailPage from "./components/pages/UserDetail";
import { UserProvider } from "./components/pages/context/UserConetxt";

function App() {
  return (
    <div className="">

      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>

  );
}

export default App;
