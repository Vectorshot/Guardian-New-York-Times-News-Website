import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Share from "@/components/Share";
import Section from '@/components/News_section'
import { IconContext } from "react-icons";
import { MdShare } from "react-icons/md";
import "../CSS/style.css";

class Card_search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
      show: false
    };
  }

  parse_img() {
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
        // console.log("https://www.nytimes.com/" + this.props.multimedia[0].url);
        for(var i in this.props.multimedia){
          if(this.props.multimedia[i].width>=2000){
            return "https://www.nytimes.com/" + this.props.multimedia[0].url
          }
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
    }
  }
  //   添加了一个包@babel/plugin-proposal-class-properties

  componentDidMount() {
    // document
    //   .getElementsByClassName("card_tab")[0]
    //   .addEventListener("click", () => {
    //     if (this.props.source) {
    //       this.Detail_guardian;
    //     } else {
    //       this.Nytimes_detail;
    //     }
    //   });
    // document
    //   .getElementsByClassName("News_ICON")[0]
    //   .addEventListener("click", () => {
    //     this.Share;
    //   });
  }

  Detail_guardian = () => {
    this.props.history.push("/article?id=" + this.props.id);
  };

  Nytimes_detail = () => {
    this.props.history.push("article?id=" + this.props.web_url);
  };

  Share = e => {
    console.log("share");
    e.stopPropagation();
  };
  render() {
    if (this.props.source) {
      // console.log(this.props)
      return (
        <div className="card_tab" onClick={this.Detail_guardian}>
          {/* <div className="title_of_tab"> */}
          <div className="title_real">
            {this.props.webTitle}
            {/* <MdShare
              className="News_ICON"
              style={{ display: "inline", margin: "auto" }}
              onClick={this.Share}
            /> */}
            <Share
              title_of_result={this.props.webTitle}
              source={this.props.webUrl}
              onClick={e => {
                e.stopPropagation();
              }}
            />
          </div>
          {/* </div> */}
          <div className="image_tab">
            <img src={this.parse_img()} alt="" />
          </div>
          <div className="tab_date_section">
            <div className="pub_date">
              {this.props.webPublicationDate.slice(0, 10)}
            </div>
            <div className="news_section">
              {/* <p>{this.props.sectionId}</p> */}
              <Section section_id={this.props.sectionId}/>
            </div>
          </div>
          {/* <div className="card_content">
            <div className="card_title">
              <div className="real_Title">
                <p>{this.props.webTitle}</p>
              </div>
              <div className="share_icon"></div>
            </div>
            <div className="card_date_icon">
              <div className="card_date">
                {this.props.webPublicationDate.slice(0, 10)}
              </div>
              <div className="card_icon"></div>
            </div>
          </div> */}
        </div>
      );
    } else {
      // console.log("ny search "+JSON.stringify(this.props))
      console.log("search");
      return (
        <div className="card_tab" onClick={this.Nytimes_detail}>
          {/* <div className="card_title">
            <div className="real_Title">
              <p>{this.props.headline.main}</p>
            </div>
            <div className="share_icon"></div>
          </div>
          <div className="image_tab">
            <img src={this.parse_img()} alt="" />
          </div>
          <div className="card_date_icon">
            <div className="card_date">{this.props.pub_date.slice(0, 10)}</div>
            <div className="card_icon"></div>
          </div> */}

          <div className="title_real">
            {this.props.headline.main}
            <Share
              title_of_result={this.props.headline.main}
              source={this.props.web_url}
              onClick={e => {
                e.stopPropagation();
              }}
            />
            {/* <MdShare
              className="News_ICON"
              style={{ display: "inline", margin: "auto" }}
              onClick={this.Share}
            /> */}
          </div>
          {/* </div> */}
          <div className="image_tab">
            <img src={this.parse_img()} alt="" />
          </div>
          <div className="tab_date_section">
            <div className="pub_date">{this.props.pub_date.slice(0, 10)}</div>
            <div className="news_section">
              {/* <p>{this.props.news_desk}</p> */}
              <Section section_id={this.props.news_desk}/>
            </div>
          </div>
          {/* <div className="card_content">
            <div className="card_title">
              <div className="real_Title">
                <p>{this.props.headline.main}</p>
              </div>
              <div className="share_icon"></div>
            </div>
            <div className="card_date_icon">
              <div className="card_date">
                {this.props.pub_date.slice(0, 10)}
              </div>
              <div className="card_icon"></div>
            </div>
          </div> */}
        </div>
      );
    }
  }
}

export default withRouter(Card_search);
