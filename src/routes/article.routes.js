const express = require("express");
const articleCtrl = require("../controllers/article.controllers");

const router = express.Router();

router.post("/", articleCtrl.createArticle);

router.get("/", articleCtrl.getAllArticles);

router.get("/:id", articleCtrl.getArticleById);

router.put("/:id", articleCtrl.updateArticle);

router.delete("/:id", articleCtrl.deleteArticle);

module.exports = router;
