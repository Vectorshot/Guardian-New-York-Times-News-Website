import React from "react";
import { HashRouter, Route, Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Select from "react-select";
// import Async from 'react-select/async'
import Switch_button from "@/components/Switch_button";
// import History from "history";
import Search from "@/components/Search";
import Bookmark from "@/components/Bookmark";
// import { createHashHistory } from "history";

import ReactTooltip from 'react-tooltip'
import "../CSS/style.css";
import { css } from "@emotion/core";

const navbar=css`
  background: linear-gradient(to right,rgb(45,40,174),rgb(45,193,240)) !important;
 `

class Headline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
    };
    this.switch_ref=React.createRef()
    this.span_ref_ny=React.createRef()
    this.span_ref_g=React.createRef()

    this.homepage=React.createRef()
    this.world_sec=React.createRef()
    this.politic_sec=React.createRef()
    this.business_sec=React.createRef()
    this.tech_sec=React.createRef()
    this.sport_sec=React.createRef()
  }

  Favorite_file = () => {
    console.log("Favorite");
    this.props.history.push("/favorites");
  };

  componentDidMount(){
    // this.props.history.listen(()=>{
    //   // console.log(this.props.history)
    //   const router=this.props.history.location.pathname
    //   // let button=document.getElementsByTagName("Switch_button")[0]
    //   // console.log(button)
    //   if(router=='/'|router=='/world'|router=='/politics'|router=='/business'|router=='/technology'|router=='/sports'){
    //   //  button.style.display=="block"
    //   // this.switch_ref.current.style.display=="block"
    //   // console.log(this.switch_ref.current)
    //   // if(router=='/'){
    //   //   console.log(router)
    //   //   console.log('homep')
    //   //   this.homepage.current.className="nav-link active"
    //   // }
    //   this.switch_ref.current.state.display=true
    //   this.span_ref_g.current.style.display="block"
    //   this.span_ref_ny.current.style.display="block"
    //   }
    //   else{
    //     // this.switch_ref.current.style.display="none"
    //     // console.log("other_router")
    //     this.switch_ref.current.state.display=false
    //     this.span_ref_g.current.style.display="none"
    //     this.span_ref_ny.current.style.display="none"
    //   }
    // })
    this.listen();
  }

  componentWillUpdate(){
    this.listen();
  }

  listen=()=>{
    // this.props.history.listen(()=>{
      // console.log(this.props.history)
      // console.log(window.location)
      const p=window.location.href.indexOf('#')+1
      const router=window.location.href.slice(p)
      // let button=document.getElementsByTagName("Switch_button")[0]
      // console.log(button)
      if(router=='/'|router=='/world'|router=='/politics'|router=='/business'|router=='/technology'|router=='/sports'){
      //  button.style.display=="block"
      // this.switch_ref.current.style.display=="block"
      // console.log(this.switch_ref.current)
      // if(router=='/'){
      //   console.log(router)
      //   console.log('homep')
      //   this.homepage.current.className="nav-link active"
      // }
      if(router=='/'){
        this.homepage.current.className="nav-link active"
      }
      else{
        this.homepage.current.className="nav-link"
      }

      if(router=='/world'){
        this.world_sec.current.className="nav-link active"
      }
      else{
        this.world_sec.current.className="nav-link"
      }

      if(router=='/politics'){
        this.politic_sec.current.className="nav-link active"
      }
      else{
        this.politic_sec.current.className="nav-link"
      }

      if(router=='/business'){
        this.business_sec.current.className="nav-link active"
      }
      else{
        this.business_sec.current.className="nav-link"
      }

      if(router=='/technology'){
        this.tech_sec.current.className="nav-link active"
      }
      else{
        this.tech_sec.current.className="nav-link"
      }

      if(router=='/sports'){
        this.sport_sec.current.className="nav-link active"
      }
      else{
        this.sport_sec.current.className="nav-link"
      }

      // this.switch_ref.current.state.display=true
      this.switch_ref.current.style.display="block"
      this.span_ref_g.current.style.display="block"
      this.span_ref_ny.current.style.display="block"
      }
      else{
        // this.switch_ref.current.style.display="none"
        // console.log("other_router")
        this.homepage.current.className="nav-link"
        this.world_sec.current.className="nav-link"
        this.politic_sec.current.className="nav-link"
        this.business_sec.current.className="nav-link"
        this.tech_sec.current.className="nav-link"
        this.sport_sec.current.className="nav-link"
        this.switch_ref.current.style.display="none"
        this.span_ref_g.current.style.display="none"
        this.span_ref_ny.current.style.display="none"
      }
    // })
  }

  // listen_history = () => {
  //   console.log("browser")
  //   const history = createHashHistory();
  //   const location = this.props.history;
  //   const listen = history.listen((location) => {
  //     // console.log(location);
  //     let router=location.pathname
  //     if(router=='/'|router=='/world'|router=='/politics'|router=='/business'|router=='/technology'|router=='/sports'){
  //       console.log(document.getElementByTagName("Switch_button")[0])
  //       document.getElementByTagName("Switch_button")[0].style.display="block"
  //     }
  //     else{
  //       document.getElementsByTagName("Switch_button")[0].style.display="none"
  //     }
  //   });
  //   listen(this.props.history)
  // };

  render() {
    // this.listen_history()
    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg" style={navbar}>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          {/* <Form inline> */}
          {/* <FormControl type="text" placeholder="Enter Keyword.." className="mr-sm-2" /> */}
          {/* <Select
              className="search_box"
              placeholder="Enter Keyword.."
            ></Select> */}
          <Search />
          {/* </Form> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link" ref={this.homepage}>
                Home
              </Link>
              <Link to="/world" className="nav-link" ref={this.world_sec}>
                World
              </Link>
              <Link to="/politics" className="nav-link" ref={this.politic_sec}>
                Politics
              </Link>
              <Link to="/business" className="nav-link" ref={this.business_sec}>
                Business
              </Link>
              <Link to="/technology" className="nav-link" ref={this.tech_sec}>
                Technology
              </Link>
              <Link to="/sports" className="nav-link" ref={this.sport_sec}>
                Sports
              </Link>
            </Nav>
            {/* <Link to="/favorites"> */}
            <span className="bookmark_favor" onClick={this.Favorite_file} data-tip="bookmark" data-for="bookmark">
              <Bookmark></Bookmark>
            </span>
            <ReactTooltip id="bookmark" className="tip" effect="solid" backgroundColor="black" place="bottom">
              <span>Bookmark</span>
            </ReactTooltip>
            {/* </Link> */}
            
            <span style={{ display: "block", margin: "5px", color: "white" }} ref={this.span_ref_ny}>
              NY Times
            </span>
            <span  ref={this.switch_ref}>
            <Switch_button
              change_source={this.props.change_source}
            ></Switch_button></span>
            <span style={{ display: "block", margin: "5px", color: "white" }} ref={this.span_ref_g}>
              Guardian
            </span>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Headline);
