import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import CreateSurvey_1 from './layouts/CreateSurvey_1';
import CreateAnchors from './layouts/CreateAnchors';
import StatementCreator from './layouts/StatementCreator'

export default class App extends React.Component {
  render() {
    return (
      <CreateAnchors/>
    );
  }
}

/*
1. Admin uses CreateSurvey_1 page
to start the survey creation process
then moves to the next page 
CreateAnchors which
then moves to StatementCreator page*/