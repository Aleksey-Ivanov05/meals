import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";

function App() {
  return (
    <>
      <div className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <span className="navbar-brand">Calorie tracker</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
        <Route path="/meals/add" element={(<NewMeal/>)}/>
        <Route path="/meals/:id/edit" element={(<EditMeal/>)}/>
      </Routes>
    </>
  );
}

export default App;
