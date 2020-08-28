import React from "react";
import { HashRouter, Route, Link, Switch, withRouter } from "react-router-dom";
import {browserHistory} from 'react-router-dom'
import Home from "@/components/Home";
import Movie from "@/components/Movie";
import About from "@/components/About";
import Headline from "@/components/Headline";
import Container from "@/components/Container";
import Other_container from "@/components/Other_container";
import Search_results from "@/components/Search_results";
import News_content from "@/components/News_content";

import Favorite from '@/components/Favoritecontainer'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //私有数据
      news_source: true
      // true 来源于Guardian
      // false 来源于NY Times
    };
  }

  // componentWillMount() {
  //   // console.log("ok");
  //   console.log("父组件componentWillMount调用");
  // }

  change_news_source() {
    
    this.setState({
      news_source: !this.state.news_source
    })
    // ,()=>{
    //   // if(localStorage.getItem('news_source')!=null){
    //   //   localStorage.removeItem('news_source')
    //   // }
    //   localStorage.setItem('news_source',this.state.news_source)
    // });
    // console.log("父组件state改变");
  }

  // componentDidMount(){
  //   localStorage.setItem('news_source',this.state.news_source)
  // }

  // componentWillUpdate() {
  //   // this.LoadData();
  //   console.log("父组件componentWillUpdate调用");
  // }

  // componentDidUpdate() {
  //   console.log("父组件componentDidUpdate调用");
  // }
  render() {
    // console.log("App渲染");
    return (
      // 路由匹配规则：先匹配最上面的，/search放在/:name下面，有/search的时候就会自动匹配到/:name
      <HashRouter>
        <Headline change_source={this.change_news_source.bind(this)}></Headline>
        <Switch>
          <Route
            path="/search"
            exact
            render={props => (
              <Search_results news_source={this.state.news_source} {...props} />
            )}
          />
          <Route
            path="/article"
            exact
            render={props => <News_content news_source={this.state.news_source} {...props} />}
          />
          {/* <Route path="/" exact component={Container} /> */}
          {/* {console.log("父组件传入container" + this.state.news_source)} */}
          <Route
            path="/favorites"
            exact
            render={props => <Favorite news_source={this.state.news_source} {...props} />}
          />
          <Route
            path="/"
            exact
            render={props => (
              <Container news_source={this.state.news_source} {...props} />
            )}
          />
          <Route
            path="/:name"
            exact
            render={props => (
              <Other_container
                news_source={this.state.news_source}
                {...props}
              />
            )}
          />
          )}/>
        </Switch>
      </HashRouter>
    );
  }
}
