const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

let items = [];
let worklist = [];
app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    kindofday: day,
    newItem: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  let addtodo = req.body.addtodo;
  if(req.body.list === "work"){
    worklist.push(addtodo);
    res.redirect("/work");
  }
  else{
    items.push(addtodo);
    res.redirect("/");
  }


});

app.get("/work",function(req,res){
  res.render("list",{
    kindofday: "work",
    newItem: worklist
  });
});

app.listen(3000, function() {
  console.log("server running on port 3000");
});
