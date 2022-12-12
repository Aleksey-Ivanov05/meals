import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";

function App() {
  return (
    <>
      <div className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Calorie tracker</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
      </Routes>
    </>
  );
}

export default App;
