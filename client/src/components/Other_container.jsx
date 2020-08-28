import React from "react";

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Card from "@/components/Card";
import "../CSS/style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Other_container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
      status: "ok",
      isloading: true,
      totalnum: 10,
      articles: []
    };
  }

  componentWillMount() {
    // console.log("ok");
    this.LoadData(this.props.news_source);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      articles:[],
      isloading:true
    },()=>{
      this.LoadData(nextProps.news_source)
    })
  }

  LoadData = (source) => {
    if(source){
      fetch("/guardian/" + this.props.match.params.name)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        data = JSON.parse(data);
        this.setState({
          status: data.response.status,
          isloading: false,
          articles: data.response.results
        });
        // console.log(this.state.articles)
      });
    }
    else{
      fetch("/nytimes/" + this.props.match.params.name)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        data = JSON.parse(data);
        this.setState({
          status: data.status,
          isloading: false,
          articles: data.results
        });
        // console.log(this.state.articles)
      });
    }
    
  };

  renderList() {
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
        if(this.state.articles.length<=10)
        return (
          <div>
            {this.state.articles.map((item,index) => {
              //   console.log(this.props.match.params.name)
              // console.log(item);
              return <Card {...item} source={this.props.news_source} history={this.props.history} key={index}></Card>;
            })}
          </div>
        );
        else{
          let article_shown=this.state.articles.slice(0,10)
          return(
            <div>
              {article_shown.map((item,index)=>{
                return <Card {...item} source={this.props.news_source} history={this.props.history} key={index}></Card>
              })}
            </div>
          )
        }
      }
    }
  }
  render() {
    // console.log(this.props)
    return (
      
      <div id="container">
        {/* other_container--{this.props.match.params.name} */}
        {this.renderList()}
        {/* 传入路由参数 */}
      </div>
    );
  }
}

export default props => (
  <Other_container {...props} key={props.location.pathname} />
);
