import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Account } from "./pages/Account";
import { EditAccount } from "./pages/EditAccount";
import { Home } from "./pages/Home";

function App() {
  const activeStyle = ({ isActive }: any) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  return (
    <Router>
      <div className="Header">
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
        <NavLink to="/account" style={activeStyle}>
          Account
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/edit" element={<EditAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
