const { response } = require("express");
const express = require("express");
const axios = require("axios").default;
const stringify = require("json-stringify-safe");

const app = express();
app.set("view engine", "ejs")

let port = process.env.PORT;

app.get("/", (req, res) => {
  res.render("search")
});

app.get("/results", (req, res) => {
    const query = req.query.search;
  axios({
    method: "get",
    url: "http://www.omdbapi.com/?apikey=dd3f9cf2&s=" + query,
    params: {
      _limit: 100,
    },
  }).then((data) => res.render("results", {data: data.data})).then(err => {
      res.send("No movies found!!")
  })
});

app.listen(`${port}`, () => {
  console.log("Server started");
});
