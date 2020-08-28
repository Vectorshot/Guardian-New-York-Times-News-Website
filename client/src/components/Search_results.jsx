import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Card_search from "@/components/Card_search";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../CSS/style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Search_results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
      source: true,
      status: "ok",
      articles: [],
      total_num: 10,
      isloading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        articles: [],
        isloading: true
      },
      () => {
        this.LoadData(nextProps.news_source);
      }
    );
  } //页面完成连续搜索

  componentDidMount() {
    // this.LoadData(this.props.news_source);
    this.setState(
      {
        articles: [],
        isloading: true
      },
      () => {
        this.LoadData(this.props.news_source);
      }
    );
  }

  LoadData = source => {
    // console.log("load");
    // console.log(this.props);
    var guardian_url = "/guardian/article/search" + this.props.location.search;
    var nytimes_url = "/nytimes/article/search" + this.props.location.search;
    //this.state.source
    if (source) {
      // console.log(guardian_url);
      fetch(guardian_url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          data = JSON.parse(data);
          this.setState(
            {
              status: data.response.status,
              isloading: false,
              articles: data.response.results
            }
            // ,
            // function() {
            //   console.log("Container 请求guardian");
            //   console.log(this.state.articles);
            // }
          );
          // console.log(this.state.articles)
        });
    } else {
      // console.log(nytimes_url);
      fetch(nytimes_url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          data = JSON.parse(data);
          this.setState(
            {
              status: data.status,
              isloading: false,
              articles: data.response.docs
            }
            // ,
            // function() {
            //   console.log(this.state.articles);
            // }
          );
          // console.log(this.state.source);
          // console.log(this.state.articles);
        });
    }
  };

  render() {
    return (
      <div id="container">
        {this.renderList()}
        {/* <Card></Card> */}
      </div>
    );
  }

  renderList() {
    // this.LoadData()
    // console.log(this.state.isloading);
    if (this.state.isloading) {
      return (
        <div className="sweet-loading">
          <div className="processing">
            <div className="loading_icon">
          <BounceLoader
            css={override}
            size={30}
            color={"#123abc"}
            loading={this.state.isloading}
          /></div>
          <h5>Loading</h5></div>
        </div>
      );
    } else {
      if (this.state.status == "error") {
        return (
          <div>
            <h1>No news results</h1>
          </div>
        );
      } else {
        return (
          <div className="search_container">
            <h3 className="header_words">Results</h3>
            {/* <div className="tab_container"> */}
            <Container fluid>
              <Row>
                {this.state.articles.map((item, index) => {
                  // console.log(item.title)
                  // console.log(item)
                  // console.log(index)
                  return (
                    <Col sm={6} lg={4} md={4} xl={3} xs={12} key={index}> 
                      <Card_search
                        {...item}
                        source={this.props.news_source}
                        key={index}
                      ></Card_search>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        );
      }
    }
  }
}
