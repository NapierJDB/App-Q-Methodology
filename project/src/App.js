import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import CreateSurvey_1 from './layouts/CreateSurvey_1';
import CreateAnchors from './layouts/CreateAnchors';

export default class App extends React.Component {
  render() {
    return (
      <CreateAnchors />
    );
  }
}