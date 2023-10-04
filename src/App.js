import React, { useEffect, useState } from "react";
import { BrowserRouter , Routes, Route,Navigate} from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import ChatInterface from "./components/chatview/ChatInterface";
import { CometChat } from "@cometchat-pro/chat";
import './App.css';

const App = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    CometChat.getLoggedinUser()
      .then((user) => {
        setActive(user);
        console.log("User details:", user);
      })
      .catch((error) => {
        console.log("Error getting details:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={active ? <Dashboard /> : <SignIn />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={active ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/interface" element={<ChatInterface />} />
        {/* <Route exact path="/" component={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;