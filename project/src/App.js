import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import CreateSurvey from './layouts/CreateSurvey';
//import StatementCreator from './layouts/StatementCreator';
import PrivacyScreen from './layouts/PrivacyScreen';
import Reject from './layouts/Reject'
import NewAnchors from './layouts/NewAnchors';
import NewStatements from './layouts/NewStatements';
import Debrief from './layouts/Debrief'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/RegForm' component={RegForm} />
            <Route path='/AdminPanel' component={AdminPanel} />
            <Route path='/CreateSurvey' component={CreateSurvey} />
            <Route path='/NewAnchors' component={NewAnchors} />
            <Route path='/PrivacyScreen' component={PrivacyScreen} />
            <Route path='/Reject' component={Reject} />
            <Route path='/Debrief' component={Debrief} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const HomePage = () => (
  <div>
    <Home />
  </div>
);

/*
1. Admin uses CreateSurvey_1 page
to start the survey creation process
then moves to the next page
CreateAnchors which
then moves to StatementCreator page
https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch
*/