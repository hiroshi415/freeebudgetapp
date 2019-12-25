import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import List from "./components/List";
import EditList from "./components/EditList";
import Create from "./components/Create";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={List} />
        <Route path="/edit/:id" component={EditList} />
        <Route path="/create" component={Create} />
      </div>
    </Router>
  );
};

export default App;
