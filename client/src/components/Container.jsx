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

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //私有数据
      source: true,
      status: "ok",
      articles: [],
      total_num: 10,
      isloading: true,
    };
  }

  componentDidMount() {
    // this.setState(
    //   {
    //     articles: [],
    //     isloading: true,
    //   },
    //   () => {
    //     this.LoadData(nextProps.news_source);
    //   }
    // );
    this.LoadData(this.props.news_source);
  }

  componentWillReceiveProps(nextProps) {
    // this.LoadData(nextProps.news_source);
    this.setState(
      {
        articles: [],
        isloading: true,
      },
      () => {
        this.LoadData(nextProps.news_source);
      }
    );
  }

  LoadData = (source) => {
    //this.state.source
    // console.log(localStorage)
    // if(localStorage.getItem('news_source')!=null){
      // var news_source=source
      // var storage=localStorage.getItem('news_source')
      // console.log(storage)
      // if(storage=='true'){
      //   news_source=true
      // }
      // else if(storage=='false'){
      //   news_source=false
      // }
      // if(localStorage.getItem('news_source')==='true'){
      //   news_source=true
      // }
      // else if(localStorage.getItem('news_source')==='false'){
      //   news_source=false
      // }
    // }
    if (source) {
      fetch("/guardian/home")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          data = JSON.parse(data);
          this.setState(
            {
              status: data.response.status,
              isloading: false,
              articles: data.response.results,
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
      console.log("Container请求ny times");
      fetch("/nytimes/home")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          data = JSON.parse(data);
          this.setState(
            {
              status: data.status,
              isloading: false,
              articles: data.results,
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
    // console.log("container "+this.props.history)
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
            />
            </div>
            <h5>Loading</h5>
          </div>
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
            {this.state.articles.map((item, index) => {
              // console.log(item.title)
              // console.log(index)
              return (
                <Card
                  {...item}
                  source={this.props.news_source}
                  key={index}
                  history={this.props.history}
                ></Card>
              );
            })}
          </div>
        );
        else{
          let shown_card=this.state.articles.slice(0,10)
          return(
            <div>
              {shown_card.map((item,index)=>{
                return (
                  <Card {...item} source={this.props.news_source} key={index} history={this.props.history}></Card>
                )
              })}
            </div>
          )
        }
      }
    }
  }
}
