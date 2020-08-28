import React from "react";
import "../CSS/style.css";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.section_id == "world") {
      return (
        <div className="section" style={{ backgroundColor: "rgb(124,78,255)" }}>
          <p className="cate_id">{this.props.section_id}</p>
        </div>
      );
    } else if (this.props.section_id == "politics") {
      return <div className="section" style={{backgroundColor:"rgb(65,148,136)"}}>
          <p className="cate_id">{this.props.section_id}</p>
      </div>;
    }
    else if(this.props.section_id=="business"){
        return (
            <div className="section" style={{backgroundColor:"rgb(70,150,236)"}}>
                <p className="cate_id">{this.props.section_id}</p>
            </div>
        )
    }
    else if(this.props.section_id=="technology"){
        return (
            <div className="section" style={{backgroundColor:"rgb(206,220,57)",color:"black"}}>
                <p className="cate_id">{this.props.section_id}</p>
            </div>
        )
    }
    else if(this.props.section_id=="sports"|this.props.section_id=='sport'){
        return (
            <div className="section" style={{backgroundColor:"rgb(246,194,68)",color:"black"}}>
                <p className="cate_id">sports</p>
            </div>
        )
    }
    else if(this.props.section_id=="guardian"){
        return (
            <div className="section" style={{backgroundColor:"rgb(20,40,74)"}}>
                <p className="cate_id">{this.props.section_id}</p>
            </div>
        )
    }
    else if(this.props.section_id=="ny_times"|this.props.section_id=="nytimes"){
        return (
            <div className="section" style={{backgroundColor:"rgb(221,221,221)",color:"black"}}>
                <p className="cate_id">{this.props.section_id}</p>
            </div>
        )
    }
    else{
        return (
            <div className="section">
                <p className="cate_id">{this.props.section_id}</p>
            </div>
        )
    }
  }
}
