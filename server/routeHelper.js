const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require("mongodb").ObjectID;
const dbName = "gaming_nation",
  collectionName = "users",
  favoriteCollection = "favorits";


function addToFavorits(req,res) {
 
  const {email} = req.body;
  MongoClient.connect(url, function(err, db) {

  if (err) throw err;
  var dbo = db.db(dbName);
  dbo.collection(favoriteCollection).find({email}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result , 'find games in db'); 
    if(result.length === 0){
      let myobj = req.body;
      dbo.collection(favoriteCollection).insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
     return res.status(201).send(result);

  });

    }else{

      console.log(result)
     let checkGame = result.find(game => 
        game.name === req.body.name
      )
      console.log(checkGame,'checkGame');
      
      if(checkGame === undefined){
        
             let myobj = req.body;
      dbo.collection(favoriteCollection).insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
     return res.status(201).send(result);

      });

      }
      else{
        return res.status(400).send('game exists');
      }
      
 
    }
    
    db.close();
  });   
  });
}

function signUp(req, res) {
  console.log("users/signUp is accessed");
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);
    const queryUser = req.body;
    dbo
      .collection(collectionName)
      .findOne({ email: queryUser.email }, function(err, userFound) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        if (userFound) {
          // email found and password matched
          return res.sendStatus(400);
        }

        //   no email match insert user
        dbo
          .collection(collectionName)
          .insertOne(queryUser, function(err, user) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }

            return res.status(201).send(user);
            // return res.sendStatus(201);
          });
      });
  });
}

function login(req, res) {
  console.log("users/login is accessed");
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);
    // expcting only email , pasword
    const queryUser = req.body;
    console.log(queryUser , "queryUser");
    

    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(user);
      
      if (user) {
        // this is post but no document is created so return 200
        console.log("send user login");

        return res.status(200).send(user);
      }

      //   user not found
      return res.sendStatus(404);
    });
  });
}


function getFavorites(req,res){
  console.log("users/get favorites");
  let email = req.params.email;
  console.log(email, "email req params")

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
      
  if (err) throw err;
  var dbo = db.db(dbName);
  dbo.collection(favoriteCollection).find({email}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result , 'find games in db'); 
    res.status(200).send(result)

    });
  }); 
}



function deleteFavorite(req,res){ 

let id = req.params.id
console.log(id);

MongoClient.connect(url, function(err, db) {

  if (err) throw err;

  var dbo = db.db(dbName);
  var myquery = {_id: ObjectID(id)};

  dbo.collection(favoriteCollection).deleteOne(myquery, function(err, obj) {

    if (err) throw err;

    res.status(200).send(obj)

    console.log("1 document deleted");
    db.close();
  });
});
  

}


module.exports.signUp = signUp;
module.exports.login = login;
module.exports.addToFavorits = addToFavorits;
module.exports.getFavorites = getFavorites;
module.exports.deleteFavorite = deleteFavorite;
