import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import {IconContext} from 'react-icons'

import { ToastContainer, toast, Zoom } from "react-toastify";

import { css } from "glamor";
import "react-toastify/dist/ReactToastify.min.css";

import "../CSS/style.css";

export default class Bookmark_favor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: this.props.favored,
    };
  }

  componentWillReceiveProps(p) {
    this.setState({
      added: p.favored,
    });
  }

  add_bookmark = () => {
    this.props.favorite();
    this.setState({
      added: true,
    });
    this.notify_add();
  };

  notify_add = () => {
    toast("Saving " + this.props.article_tit, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      bodyClassName:css({
        fontSize:'12px',
        color:'black'
      })
    });
  };

  close_bookmark = () => {
    localStorage.removeItem(this.props.article);
    this.setState({
      added: false,
    });
    this.notify_close();
  };

  notify_close = () => {
    toast("Removing " + this.props.article_tit, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      bodyClassName:css({
        fontSize:'12px',
        color:'black'
      })
    });
  };

  render() {
    if (this.state.added) {
      return (
        <div onClick={this.close_bookmark}>
          <IconContext.Provider value={{size:"1.5em"}}>
          <FaBookmark style={{ color: "red", size: "1em" }} /></IconContext.Provider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            hideProgressBar
            closeOnClick
            rtl={false}
            transition={Zoom}
          />
        </div>
      );
    } else {
      return (
        <div onClick={this.add_bookmark}>
          <IconContext.Provider value={{size:"1.5em"}}>
          <FaRegBookmark style={{ color: "red", size: "1em" }} /></IconContext.Provider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            hideProgressBar
            closeOnClick
            rtl={false}
            transition={Zoom}
          />
        </div>
      );
    }
  }
}
