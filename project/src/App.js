import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";

export default class App extends React.Component {
  render() {
    return (
      <AdminPanel />
    );
  }
}