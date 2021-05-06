import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { PrivateRoute } from "./routes/PrivateRoute";
import ExamPage from "./pages/ExamPage/ExamPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={Home} />

          <PrivateRoute exact path="/start" component={ExamPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
