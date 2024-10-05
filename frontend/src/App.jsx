import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./home/Home";
import Signup from "./signup/Signup";
import Login from "./component/Login";
import { useAuth } from "./context/AuthProvider";
import News from "./News/News";
import Market from "./Marketplace.jsx/Market";
import Records from "./records/Records";

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home high="1" /> : <Login />} />
        <Route path="/news" element={authUser ? <News high="3" /> : <Login />} />
        <Route path="/market" element={authUser ? <Market high="2" /> : <Login />} />
        <Route path="/records" element={authUser ? <Records high="4" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Home /> : <Signup />} />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
