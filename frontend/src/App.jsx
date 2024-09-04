import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { useAuthContext } from "./context/AuthContext";
import { GroupContextProvider } from "./context/GroupContext"; // Import GroupContextProvider

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <GroupContextProvider>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
          <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
      </GroupContextProvider>
    </div>
  );
}

export default App;
