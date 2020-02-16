const express = require("express");
const app = express();
const routeHelper = require("./routeHelper");

app.use(express.json());

app.post("/users/signUp", (req, res) => {
  routeHelper.signUp(req, res);
});
app.post("/users/login", (req, res) => {
  routeHelper.login(req, res);
});


app.get("/user/favorite/:email" , (req,res) =>{
     routeHelper.getFavorites(req,res);
});

app.post("/user/favorite", (req,res)=>{
  routeHelper.addToFavorits(req,res);
});


app.delete("/user/favorite/:id", (req,res)=>{
  routeHelper.deleteFavorite(req,res);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is up on port: " + PORT));
