import React, { Component } from "react";

import { GUARDAR } from "./EntityController.js";

class View extends Component {
  componentDidMount() {
    console.log("componentDidMountView");
    GUARDAR().then((resppp) => {
      console.log("ViewWWWW", resppp);
    });
  }

  render() {
    return (
      <div>
        Hello every one!
        <h1>Hello every one!</h1>
        <h1>Hello every one!</h1>
        <h1>Hello every one!</h1>
        <h1>Hello every one!</h1>
        <h1>Hello every one!</h1>
        <h1>Hello every one!</h1>
      </div>
    );
  }
}
export default View;
