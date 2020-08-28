var express = require("express");
var path = require("path");
var fs = require("fs");
var request = require("request");
var favicon = require('serve-favicon')

var app = express();

app.use("/libs/", express.static(path.join(__dirname, "./client/dist/")));

app.use(favicon(path.join(__dirname,'./client/dist/','favicon.ico')))

app.set("views", path.join(__dirname, "./client/dist/"));
app.engine("html", require("express-art-template"));

const api_key_g = "aac898c4-e7c1-48db-b3eb-50cc2a3e8e5d";
const new_t_api = "oE3sCUAjtvOq6ZHSIG4McGrkV5KpvU1h";
app.get("/", function(request, response) {
  response.render("index.html");
});

function getJson(url, callback) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      console.log(error);
    }
  });
}

app.get("/guardian/home", function(req, res) {
  console.log("请求guardian首页");
  getJson(
    "https://content.guardianapis.com/search?api-key=" +
      api_key_g +
      "&section=(sport|business|technology|politics)&show-blocks=all",
    function(data) {
      res.json(data);
      //json.parse data
      //   console.log(res.json(data))
    }
  );
});

app.get("/guardian/:name", function(req, res, next) {
  // console.log(req);
  console.log("请求guardian");
  if (req.params.name == "sports") {
    getJson(
      "https://content.guardianapis.com/" +
        "sport" +
        "?api-key=" +
        api_key_g +
        "&show-blocks=all",
      function(data) {
        res.json(data);
        //   console.log(res.json(data))
      }
    );
  } else {
    getJson(
      "https://content.guardianapis.com/" +
        req.params.name +
        "?api-key=" +
        api_key_g +
        "&show-blocks=all",
      function(data) {
        res.json(data);
        //   console.log(res.json(data))
      }
    );
  }
});

app.get("/nytimes/home", function(req, res) {
  console.log("请求nytimes home");
  getJson(
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + new_t_api,
    function(data) {
      res.json(data);
    }
  );
});

app.get("/nytimes/:name", function(req, res) {
  console.log("请求nytimes");
  getJson(
    "https://api.nytimes.com/svc/topstories/v2/" +
      req.params.name +
      ".json?api-key=" +
      new_t_api,
    function(data) {
      res.json(data);
    }
  );
});

app.get("/guardian/article/search", function(req, res) {
  console.log("guardian搜索");
  getJson(
    "https://content.guardianapis.com/search?q=" +
      req.query.q +
      "&api-key=" +
      api_key_g +
      "&show-blocks=all",
    function(data) {
      res.json(data);
    }
  );
});

app.get("/nytimes/article/search", function(req, res) {
  console.log("nytimes搜索");
  getJson(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      req.query.q +
      "&api-key=" +
      new_t_api,
    function(data) {
      res.json(data);
    }
  );
});

app.get("/guardian/detail/article", function(req, res) {
  // console.log(req);
  // console.log(
  //   "https://content.guardianapis.com/" +
  //     req.query.id +
  //     "?api-key=" +
  //     api_key_g +
  //     "&show-blocks=all"
  // );
  getJson(
    "https://content.guardianapis.com/" +
      req.query.id +
      "?api-key=" +
      api_key_g +
      "&show-blocks=all",
    function(data) {
      res.json(data);
    }
  );
});

app.get("/nytimes/detail/article", function(req, res) {
  // console.log(req);
  
  getJson(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' +
      req.query.id +
      '")&api-key=' +
      new_t_api,
    function(data) {
      res.json(data);
      // console.log(data)
      // console.log(res.json(data))
    }
  );
});

const PORT= process.env.PORT ||8080

app.listen(PORT, function() {
  console.log("Running....");
});

module.exports=app
