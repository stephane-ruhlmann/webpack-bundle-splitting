"use strict";
const React = require("react");

module.exports = React.createClass({

  render() {
    return (
      <div className="App">
        <p>This app was bundled with webpack</p>
        <p>App and vendors code are splitted accross</p>
      </div>
    );
  }
});