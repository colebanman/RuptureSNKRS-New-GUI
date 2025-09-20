import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Proxies from "./pages/Proxies";
import Profiles from "./pages/Profiles";
import Accounts from "./pages/Accounts";




export default function App() {
  return (
    <HashRouter>
      <div className="main">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
         
          <Route path="/Tasks" exact element={<Tasks />} />
          <Route path="/Settings" exact element={<Settings />} />
          <Route path="/Proxies" exact element={<Proxies />} />
          <Route path="/Profiles" exact element={<Profiles />} />
          <Route path="/Accounts" exact element={<Accounts />} />





        </Routes>
      </div>
    </HashRouter>
  );
  }