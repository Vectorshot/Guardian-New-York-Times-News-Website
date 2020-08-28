import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Section from '@/components/News_section'
import Share from "@/components/Share";
import { IconContext } from "react-icons";
import { MdShare, MdDelete } from "react-icons/md";
import "../CSS/style.css";

class Favorite_card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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
        return "https://www.nytimes.com/" + this.props.multimedia[0].url;
      }
    }
  }
  //   componentDidMount() {
  //     document
  //       .getElementsByClassName("card_tab")[0]
  //       .addEventListener("click", () => {
  //         if (this.props.source) {
  //           this.Detail_guardian;
  //         } else {
  //           this.Nytimes_detail;
  //         }
  //       });
  //     document
  //       .getElementsByClassName("News_ICON")[0]
  //       .addEventListener("click", () => {
  //         this.Share;
  //       });
  //   }

  //   Detail_guardian = () => {
  //     this.props.history.push("/article?id=" + this.props.id);
  //   };

  //   Nytimes_detail = () => {
  //     this.props.history.push("article?id=" + this.props.web_url);
  //   };

  Full_article = () => {
    this.props.history.push("article?id=" + this.props.article);
  };

  Share = (e) => {
    console.log("share");
    e.stopPropagation();
  };
  render() {
    // if (this.props.source) {
    console.log(this.props);
    var news = "";
    if (this.props.source_of_news) {
      news = "guardian";
    } else {
      news = "nytimes";
    }
    return (
      <div className="card_tab" onClick={this.Full_article}>
        <div className="title_real">
        {/* <h5 className="title_real"> */}
          {this.props.title}
          <Share
            title_of_result={this.props.title}
            source={this.props.share}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <span style={{display:"inline"}}>
            <MdDelete
              onClick={(e) => {
                e.stopPropagation();
                this.props.remove_bookmark(this.props.card_id);
              }}
            ></MdDelete>
          </span>
        {/* </h5> */}</div>
        <div className="image_tab">
          <img src={this.props.image_origin} alt="" />
        </div>
        <div className="tab_date_section">
          <div className="pub_date">{this.props.date}</div>
          <div className="news_section">
            {/* <p>{this.props.section}</p> */}
            <Section section_id={this.props.section}/>
          </div>
          <div className="news_source">
            {/* <p>{news}</p> */}
            <Section section_id={news}/>
          </div>
        </div>
      </div>
    );
    // } else {
    //   console.log("search");
    //   return (
    //     <div className="card_tab" onClick={this.Nytimes_detail}>
    //       <h5 className="title_real">
    //         {this.props.headline.main}
    //         <Share
    //           title_of_result={this.props.headline.main}
    //           source={this.props.web_url}
    //           onClick={e => {
    //             e.stopPropagation();
    //           }}
    //         />
    //       </h5>
    //       {/* </div> */}
    //       <div className="image_tab">
    //         <img src={this.parse_img()} alt="" />
    //       </div>
    //       <div className="tab_date_section">
    //         <div className="pub_date">{this.props.pub_date.slice(0, 10)}</div>
    //         <div className="news_section">
    //           <p>{this.props.news_desk}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default withRouter(Favorite_card);
