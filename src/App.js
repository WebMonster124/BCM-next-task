import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "./App.css";

import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import QuestionList from "./components/QuestionList";

function App() {
  return (    
    <div className="container mt-5">
      <Switch>
        <Route exact path={["/", "/questions"]} component={QuestionList} />
        <Route exact path="/add" component={AddQuestion} />
        <Route path="/question/:id" component={EditQuestion} />
      </Switch>
    </div>   
  );
}

export default App;
