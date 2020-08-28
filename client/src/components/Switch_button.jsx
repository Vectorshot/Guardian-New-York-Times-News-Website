import React, { Component } from "react";
import { createHashHistory } from "history";
import Switch from "react-switch";
import "../CSS/style.css";

export default class Switch_button extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: true, display: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    // console.log("调用了");
    this.props.change_source();
    this.setState({ checked });
  }

  render() {
    if(this.state.display){
      return (
      <label style={{ textAlign: "center", margin: "0.5em" }}>
        {/* <span>NY Times</span> */}
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#349beb"
          width={70}
        />
        {/* <span>Guardian</span> */}
      </label>
    );
    }
    else{
      return(
        <div></div>
      )
    }
    
  }
}
