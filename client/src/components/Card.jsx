import React from "react";
import { withRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdShare } from "react-icons/md";
import Share from "@/components/Share";

import Section from '@/components/News_section'
import "../CSS/style.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
    };
  }

  parse_img() {
    // console.log(this.props);
    if (this.props.source) {
      if (!this.props.blocks.hasOwnProperty("main"))
        return "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      else if (
        (this.props.blocks.main.elements[0].assets.length == 0) |
        (this.props.blocks.main.elements.length == 0)
      )
        return "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      else {
        return this.props.blocks.main.elements[0].assets[
          this.props.blocks.main.elements[0].assets.length - 1
        ].file;
      }
    } else {
      if (
        !this.props.hasOwnProperty("multimedia") |
        (this.props.multimedia == null)
      ) {
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      } else if (this.props.multimedia.length == 0) {
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      } else {
        // return this.props.multimedia[0].url;
        for(var item in this.props.multimedia){
          if(this.props.multimedia[item].width>=2000){
            // console.log(this.props.multimedia[item].width)
            // console.log(this.props.multimedia[item].url)
            return this.props.multimedia[item].url
          }
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }
    }
  }
  //   添加了一个包@babel/plugin-proposal-class-properties

  componentDidMount() {
    // document.getElementsByClassName("card")[0].addEventListener("click", () => {
    //   if (this.props.source) {
    //     this.News_Detail_guardian;
    //   } else {
    //     this.Nytimes_detail;
    //   }
    // });
    // document
    //   .getElementsByClassName("share_icon")[0]
    //   .addEventListener("click", () => {
    //     this.Share;
    //   });
  }

  Share = event => {
    console.log("icon");
    event.stopPropagation();
  };

  News_Detail_guardian = () => {
    this.props.history.push("/article?id=" + this.props.id);
  };

  Nytimes_detail = () => {
    this.props.history.push("article?id=" + this.props.url);
  };
  render() {
    if (this.props.source) {
      return (
        <div className="card" onClick={this.News_Detail_guardian}>
          <div className="card_image">
            <img src={this.parse_img()} alt="" />
          </div>
          <div className="card_content">
            <div className="card_title">
              <div className="real_Title">
                {this.props.webTitle}
                <span><Share
                  title_of_result={this.props.webTitle}
                  source={this.props.webUrl}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                /></span>
                {/* <span><Share
                  title_of_result={this.props.webTitle}
                  source={this.props.webUrl}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                /></span> */}
              </div>
              {/* <div className="share_icon"> */}
                {/* <IconContext.Provider value={{ color: "black", size: "1em" }}>
                  <div className="icon">
                    <MdShare style={{ display: "block", margin: "auto" }} />
                  </div>
                </IconContext.Provider> */}
                
              {/* </div> */}
            </div>
            <div className="card_descript">
              {this.props.blocks.body[0].bodyTextSummary}
            </div>
            <div className="card_date_icon">
              <div className="card_date">
                {this.props.webPublicationDate.slice(0, 10)}
              </div>
              <div className="card_icon">
                {/* {this.props.sectionId} */}
                <Section section_id={this.props.sectionId}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // console.log(this.props);
      return (
        <div className="card" onClick={this.Nytimes_detail}>
          <div className="card_image">
            <img src={this.parse_img()} alt="" />
          </div>
          <div className="card_content">
            <div className="card_title">
              <div className="real_Title">
                {/* <p>{this.props.title}</p> */}
                {this.props.title}
                <span>
                <Share
                  title_of_result={this.props.title}
                  source={this.props.url}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                />
                </span>
              </div>
              {/* <div className="share_icon">
                <Share
                  title_of_result={this.props.title}
                  source={this.props.url}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                /> */}
                {/* <IconContext.Provider value={{ color: "black", size: "1em" }}>
                  <div className="icon">
                    <MdShare style={{ display: "block", margin: "auto" }} />
                  </div>
                </IconContext.Provider> */}
              {/* </div> */}
            </div>
            <div className="card_descript">{this.props.abstract}</div>
            <div className="card_date_icon">
              <div className="card_date">
                {this.props.published_date.slice(0, 10)}
              </div>
              <div className="card_icon">
              {/* <p>{this.props.section}</p> */}
              <Section section_id={this.props.section}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Card);
