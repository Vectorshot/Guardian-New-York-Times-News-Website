import React from "react";
import { withRouter } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from "react-icons";
import "../CSS/style.css";

class News_text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long_article: false,
    };
    this.article_content=React.createRef();
  }

  extend = () => {
    this.setState({
      long_article: true,
    });
    this.detail_word(this.article_content)
  };

  short = () => {
    this.setState({
      long_article: false,
    });
    this.detail_word(this.article_content)
  };

  detail_word=(article)=>{
    article.current.scrollIntoView({behavior:'smooth'})
  }

  render() {
    if (this.state.long_article) {
      return (
        <div>
          <p ref={this.article_content} className="news_descript">{this.props.news_content}</p>
          <div className="text_button" onClick={this.short}>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <MdKeyboardArrowUp />
            </IconContext.Provider>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p ref={this.article_content} className="short_news_decript">{this.props.news_content}</p>
          <div className="text_button" onClick={this.extend}>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <MdKeyboardArrowDown />
            </IconContext.Provider>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(News_text);
