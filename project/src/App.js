import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import SurveyOverview from './layouts/SurveyOverview';
import CreateSurvey from './layouts/CreateSurvey';
import PrivacyScreen from './layouts/PrivacyScreen';
import NewAnchors from './layouts/NewAnchors';
import NewStatements from './layouts/NewStatements';
import Debrief from './layouts/Debrief'
import Splash from './layouts/Splash';
import Participant from './layouts/Participant';
import QSort1 from './layouts/QSort1';
import QSort2Neg from './layouts/QSort2 - Negative';
import QSort2Neu from './layouts/QSort2 - Neutral';
import QSort2Pos from './layouts/QSort2 - Positive';
import End from './layouts/End';
import Complete from './layouts/Complete';
import DeleteParticipant from './layouts/DeleteParticipant';
import RequestDeletion from './layouts/RequestDeletion';
import NewQuestions from './layouts/NewQuestions';
import AnswerQuestions from './layouts/AnswerQuestions';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MyProvider } from './Context';


export default class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <Router basename={window.location.pathname || ''}>
          <div>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/Home' component={Home} />
              <Route path='/RegForm' component={RegForm} />
              <Route path='/AdminPanel' component={AdminPanel} />
              <Route path='/SurveyOverview' component={SurveyOverview} />
              <Route path='/CreateSurvey' component={CreateSurvey} />
              <Route path='/NewAnchors' component={NewAnchors} />
              <Route path='/NewStatements' component={NewStatements} />
              <Route path='/PrivacyScreen' component={PrivacyScreen} />
              <Route path='/Debrief' component={Debrief} />
              <Route path='/Splash' component={Splash} />
              <Route path='/Participant' component={Participant} />
              <Route path='/QSort1' component={QSort1} />
              <Route path='/QSort2Negative' component={QSort2Neg} />
              <Route path='/QSort2Neutral' component={QSort2Neu} />
              <Route path='/QSort2Positive' component={QSort2Pos} />
              <Route path='/End' component={End} />
              <Route path='/Complete' component={Complete} />
              <Route path='/DeleteParticipant' component={DeleteParticipant} />
              <Route path='/RequestDeletion' component={RequestDeletion} />
              <Route path='/NewQuestions' component={NewQuestions} />
              <Route path='/AnswerQuestions' component={AnswerQuestions} />
            </Switch>
          </div>
        </Router>
      </MyProvider>
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