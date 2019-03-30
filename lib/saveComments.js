"use strict";

const fs = require("fs");
const db = require("./connectMongoose");
const Comment = require("../models/comment");
const Articles = require("../models/article");
const Users = require("../models/user");

db.once("open", async () => {
  try {
    await removeDB();
    await saveComments();
  } catch (err) {
    console.log("Hubo un error", err);
    process.exit(1);
  }
});

async function removeDB() {
  await Comment.remove(function(err) {
    if (err) {
      console.log("hubo un error", err);
      return;
    }
    console.log("borrados los comentarios de la base:", db.name);
  });
}

async function saveComments() {
  //read json file with data
  await fs.readFile("./lib/initialData.json", "utf-8", async (err, data) => {
    if (err) throw err;
    const { comments } = JSON.parse(data);

    const author = await Users.findOne({ nick_name: "mzamora" }, function(
      err,
      user
    ) {
      if (err) {
        console.log("error buscando un usuario", err);
        return;
      }
    });

    const article = await Articles.findOne({title: 'Reseña Pizzeria Vesubio'});

    comments.forEach(comment => {
      comment.user = author._id;
      comment.create_at = new Date(comment.create_at);
      comment.article = article;
    });

    //insert articles on DB
    await Comment.insertMany(comments, function(err, docs) {
      if (err) {
        console.log("hubo un error con los comentarios", err);
        return;
      }
      console.log("nuevos comentarios insertados: ", docs.length);
      db.close();
    });
  });
}
