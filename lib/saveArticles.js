"use strict";

const fs = require("fs");
const db = require("./connectMongoose");
const Articles = require("../models/article");
const Users = require("../models/user");

db.once("open", async () => {
  try {
    await removeDB();
    await saveArticles();
  } catch (err) {
    console.log("Hubo un error", err);
    process.exit(1);
  }
});

async function removeDB() {
  await Articles.remove(function(err) {
    if (err) {
      console.log("hubo un error", err);
      return;
    }
    console.log("borrados los artículos de la base:", db.name);
  });
}

async function saveArticles() {
  //read json file with data
  await fs.readFile("./lib/initialData.json", "utf-8", async (err, data) => {
    if (err) throw err;
    const { articles } = JSON.parse(data);

    const author = await Users.findOne({ nick_name: "mzamora" }, function(
      err,
      user
    ) {
      if (err) {
        console.log("error buscando un usuario", err);
        return;
      }
    });

    articles.forEach(article => (article.author = author));

    //insert articles on DB
    await Articles.insertMany(articles, function(err, docs) {
      if (err) {
        console.log("hubo un error con los artículos", err);
        return;
      }
      console.log("nuevos artículos insertados: ", docs.length);
      db.close();
    });
  });
}
