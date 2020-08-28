import React from "react";
// import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ToastContainer,toast,Zoom} from 'react-toastify'
import { css } from 'glamor'
import Favorite_card from "@/components/Favorite_item_card";
import "../CSS/style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      keys: [],
      isloading: true
    };
  }

  Retrieve_storage = () => {
    let list = [];
    let key_array = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(key));
      list.push(item);
      key_array.push(key);
    }
    this.setState(
      {
        favorites: [],
        isloading: true
      },
      () => {
        this.setState({
          isloading: false,
          keys: key_array,
          favorites: list
        });
      }
    );
  };

  Container_title = () => {
    if (this.state.favorites.length == 0) {
      return <h5>You have no saved articles</h5>;
    } else {
      return <h5>Favorites</h5>;
    }
  };

  Remove_bookmarks = n => {
    // console.log(n);
    let temp = this.state.favorites;
    let key = this.state.keys;
    let title=this.state.favorites[n].title
    // console.log(key[n]);
    localStorage.removeItem(key[n]);
    // key.slice(n,1)
    // temp.slice(n, 1);
    key.splice(n, 1);
    temp.splice(n, 1);
    this.setState({
      favorites: temp,
      keys: key
    });
    toast("Removing " + title, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      bodyClassName:css({
        fontSize:'12px',
        color:'black'
      })
    });
  };

  componentDidMount() {
    this.Retrieve_storage();
  }

  render() {
    console.log(this.state.favorites);
    if (this.state.isloading) {
      return (
        <div id="container">
          {/* <h2>Favorites</h2> */}
          <div className="sweet-loading">
            <BounceLoader
              css={override}
              size={30}
              color={"#123abc"}
              loading={this.state.isloading}
            />
            <p>Loading...</p>
          </div>
        </div>
      );
    } else {
      if (this.state.favorites.length == 0)
        return (
          <div id="container">
            <h5 className="show_words">You have no saved articles</h5>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            hideProgressBar
            closeOnClick
            rtl={false}
            transition={Zoom}
          />
          </div>
        );
      else {
        return (
          <div id="container">
            <h3 className="header_words">Favorites</h3>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            hideProgressBar
            closeOnClick
            rtl={false}
            transition={Zoom}
          />
            <Container fluid>
              <Row>
                {this.state.favorites.map((item, index) => {
                  // console.log(item)
                  return (
                    <Col sm={6} md={4} lg={4} xl={3} xs={12} key={index}>
                      <Favorite_card
                        {...item}
                        key={index}
                        card_id={index}
                        remove_bookmark={this.Remove_bookmarks.bind(this)}
                      ></Favorite_card>
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
