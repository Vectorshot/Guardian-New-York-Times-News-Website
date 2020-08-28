import React from "react";
import "../CSS/style.css";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
// import { IconContext } from "react-icons";
// import { FaRegBookmark } from "react-icons/fa";

import Bookmark_favor from "@/components/Bookmarkfavor";

import News_text from '@/components/News_text.jsx'
import CommentBox from "@/components/Comment.jsx";
import ReactTooltip from "react-tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class News_content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      source:false,
      favored: false,
      title: "",
      image: "",
      date: "",
      section: "",
      web_url: "",
      descript: "",
      article: "",
    };
    // web_url是请求后台时的Id，article是文章链接分享用
  }

  componentWillMount() {
    this.loadData(this.props.news_source);
    // this.initialize()
  }

  favorite = () => {
    console.log("书签");
    var article = {
      title: this.state.title,
      image_origin: this.state.image,
      date: this.state.date,
      section: this.state.section,
      source_of_news: this.state.source,
      share: this.state.article,
      article: this.state.web_url,
    };
    console.log(article)
    localStorage.setItem(this.state.web_url, JSON.stringify(article));
    this.setState({
      favored: true,
    });
  };

  bookmark_closed = () => {
    localStorage.removeItem(this.state.web_url);
  };

  initialize = () => {
    if (localStorage.getItem(this.state.web_url)) {
      // console.log("favorite");
      this.setState({
        favored: true,
      });
    } else {
      // console.log("un_bookmark");
      // console.log(localStorage.getItem(this.state.web_url));
      // console.log(this.state.web_url);
      this.setState({
        favored: false,
      });
    }
  };

  loadData = (source) => {
    const g_url =
      "/guardian/detail/article" + this.props.history.location.search;
    const ny_url =
      "/nytimes/detail/article" + this.props.history.location.search;
    // console.log(ny_url);
    //   ny_url=""
    if (source) {
      fetch(g_url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          data = JSON.parse(data);
          //   console.log(data)
          var image_url = "";
          if (!data.response.content.blocks.hasOwnProperty("main"))
            image_url =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          else if (
            (data.response.content.blocks.main.elements[0].assets.length == 0) |
            (data.response.content.blocks.main.elements.length == 0)
          )
            image_url =
              "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          else {
            image_url =
              data.response.content.blocks.main.elements[0].assets[
                data.response.content.blocks.main.elements[0].assets.length - 1
              ].file;
          }
          // this.initialize()
          this.setState(
            {
              // status: data.response.status,
              isloading: false,
              // articles: data.response.results
              source:source,
              title: data.response.content.webTitle,
              image: image_url,
              date: data.response.content.webPublicationDate.slice(0, 10),
              section: data.response.content.sectionId,
              web_url: data.response.content.id,
              descript: data.response.content.blocks.body[0].bodyTextSummary,
              article: data.response.content.webUrl,
            },
            function () {
              this.initialize();
            }
          );
          // console.log(this.state.articles)
        });
    } else {
      //   console.log("Container请求ny times");
      // console.log("nytimes detail");
      fetch(ny_url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          var image_url = "";
          if (
            !data.response.docs[0].hasOwnProperty("multimedia") |
            (data.response.docs[0].multimedia == null)
          ) {
            image_url =
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          } else if (data.response.docs[0].multimedia.length == 0) {
            image_url =
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          } else {
            for(var i in data.response.docs[0].multimedia){
              if(data.response.docs[0].multimedia[i].width>=2000){
                image_url="https://www.nytimes.com/" + data.response.docs[0].multimedia[0].url
                break
              }
              else{
                image_url = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
              }
            }        
          }
          // this.initialize()
          this.setState(
            {
              //   status: data.status,
              isloading: false,
              source:source,
              title: data.response.docs[0].headline.main,
              image: image_url,
              date: data.response.docs[0].pub_date.slice(0, 10),
              section: data.response.docs[0].news_desk,
              web_url: data.response.docs[0].web_url,
              descript: data.response.docs[0].abstract,
              article: data.response.docs[0].web_url,
              //   articles: data.results
            },
            function () {
              this.initialize();
            }

            //   console.log(this.state.articles);
          );
          // console.log(this.state.source);
          // console.log(this.state.articles);
        });
    }
  };

  render() {
    // console.log("content");
    // console.log(this.props);
    if (this.state.isloading) {
      return (
        <div id="container"><div className="sweet-loading">
          <div className="processing">
            <div className="loading_icon">
          <BounceLoader
            css={override}
            size={30}
            color={"#123abc"}
            loading={this.state.isloading}
          /></div>
          <h5>Loading</h5></div>
        </div></div>
        
      );
    } else {
      return (
        <div id="container">
          <div className="news_content">
            <div className="news_title">{this.state.title}</div>
            <div className="news_icons">
              <div className="news_date">
                <p>{this.state.date}</p>
              </div>
              <div className="share_icons">
                <FacebookShareButton
                  url={this.state.article}
                  data-tip="Facebook"
                  data-for="facebook_tooltip"
                >
                  <FacebookIcon size={30} round />
                </FacebookShareButton>
                <ReactTooltip
                  id="facebook_tooltip"
                  className="tip"
                  type="info"
                  effect="solid"
                  backgroundColor="black"
                  // offset={{top:1}}
                >
                  <span>Facebook</span>
                </ReactTooltip>
                <TwitterShareButton
                  url={this.state.article}
                  data-tip="Twitter"
                  data-for="twitter_tooltip"
                >
                  <TwitterIcon size={30} round />
                </TwitterShareButton>
                <ReactTooltip
                  id="twitter_tooltip"
                  className="tip"
                  effect="solid"
                  backgroundColor="black"
                >
                  <span>Twitter</span>
                </ReactTooltip>
                <EmailShareButton
                  url={this.state.article}
                  data-tip="email"
                  data-for="email_tooltip"
                >
                  <EmailIcon size={30} round />
                </EmailShareButton>
                <ReactTooltip
                  id="email_tooltip"
                  className="tip"
                  effect="solid"
                  backgroundColor="black"
                >
                  <span>Email</span>
                </ReactTooltip>
              </div>
              <div
                className="bookmark"
                data-tip="bookmark"
                data-for="bookmark_tooltip"
              >
                <Bookmark_favor
                  favored={this.state.favored}
                  article={this.state.web_url}
                  favorite={this.favorite.bind(this)}
                  article_tit={this.state.title}
                />
                <ReactTooltip
                  id="bookmark_tooltip"
                  className="tip"
                  effect="solid"
                  backgroundColor="black"
                >
                  <span>Bookmark</span>
                </ReactTooltip>
                {/* <IconContext.Provider> */}
                {/* <FaRegBookmark style={{ color: "red", size: "1em" }} /> */}
                {/* </IconContext.Provider> */}
              </div>
            </div>
            <div className="news_image">
              <img src={this.state.image} alt="" />
            </div>
            {/* <div className="news_descript">
              <p>{this.state.descript}</p>
            </div>
            <div className="expand"></div> */}
            <News_text news_content={this.state.descript}></News_text>
          </div>
          <CommentBox comment_id={this.state.web_url}></CommentBox>
        </div>
      );
    }
  }
}
