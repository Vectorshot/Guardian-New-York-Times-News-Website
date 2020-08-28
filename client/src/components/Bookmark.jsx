import React from "react";
import { withRouter } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IconContext } from "react-icons";
// import ReactTooltip from 'react-tooltip'
import "../CSS/style.css";

class Bookmark extends React.Component {
  render() {
    if (this.props.history.location.pathname == "/favorites") {
      return (
        // <div>
        <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
          <FaBookmark style={{ display: "block" }} />
        </IconContext.Provider>
        // <ReactTooltip id="bookmark_tip" effect="solid" backgroundColor="black">
        //   <span>Bookmark</span>
        // </ReactTooltip></div>
      )
    } else {
      return (
        // <div>
        <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
          <FaRegBookmark style={{ display: "block" }} />
        </IconContext.Provider>
      //   <ReactTooltip id="bookmark_tip" effect="solid" backgroundColor="black">
      //   <span>Bookmark</span>
      // </ReactTooltip></div>
      );
    }
  }
}

export default withRouter(Bookmark);
