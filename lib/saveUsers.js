"use strict";

const fs = require("fs");
const db = require("./connectMongoose");
const Users = require("../models/user");

db.once("open", async () => {
  try {
    await removeDB();
    await saveUsers();
    
  } catch (err) {
    console.log("Hubo un error", err);
    process.exit(1);
  }
});

async function removeDB () {
    await Users.remove(function (err){
        if (err) {
        console.log('hubo un error', err)
        return
    }
        console.log('base borrada:', db.name)
    })
}

async function saveUsers() {

  //read json file with data 
  await fs.readFile("./lib/initialData.json", "utf-8", async (err, data) => {
    if (err) throw err;
    const { users } = JSON.parse(data);

    //insert users on DB
    await Users.insertMany(users, function(err, docs) {
      if (err) {
        console.log("hubo un error con los usuarios", err);
        return;
      }
      console.log("nuevos usuarios insertados: ", docs.length);

    });

    db.close();
  });
}
