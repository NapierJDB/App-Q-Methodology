import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import StatementCreator from './layouts/StatementCreator'

export default class App extends React.Component {
  render() {
    return (
      <StatementCreator />
    );
  }
}