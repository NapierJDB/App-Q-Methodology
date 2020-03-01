import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import SurveyOverview from './layouts/SurveyOverview';
import CreateSurvey from './layouts/CreateSurvey';
import PrivacyScreen from './layouts/PrivacyScreen';
import Reject from './layouts/Reject'
import NewAnchors from './layouts/NewAnchors';
import NewStatements from './layouts/NewStatements';
import Debrief from './layouts/Debrief'
import Splash from './layouts/Splash';
import Participant from './layouts/Participant';
import End from './layouts/End';
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
            <Route path='/' exact component={Splash} />
            <Route path='/Home' component={Home} />
            <Route path='/RegForm' component={RegForm} />
            <Route path='/AdminPanel' component={AdminPanel} />
            <Route path='/SurveyOverview' component={SurveyOverview} />
            <Route path='/CreateSurvey' component={CreateSurvey} />
            <Route path='/NewAnchors' component={NewAnchors} />
            <Route path='/NewStatements' component={NewStatements} />
            <Route path='/PrivacyScreen' component={PrivacyScreen} />
            <Route path='/Reject' component={Reject} />
            <Route path='/Debrief' component={Debrief} />
            <Route path='/Splash' component={Splash} />
            <Route path='/Participant' component={Participant}/>
            <Route path='/End' component={End}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const HomePage = () => (
  <div>
    <Splash />
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