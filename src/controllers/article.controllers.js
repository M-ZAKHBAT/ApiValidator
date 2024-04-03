const ArticleModel = require("../models/article.model");
const Joi = require("joi");

const checkingId = (id) => {
  const idSchema = Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$"));
  return idSchema.validate(id);
};

const createNewArticle = (data) => {
  const articleSchema = Joi.object({
    name: Joi.string().required().min(2).max(45),
    price: Joi.number().required(),
    category: Joi.string().required().min(2).max(24),
  });
  return articleSchema.validate(data);
};

const updateArticle = (data) => {
  const updateSchema = Joi.object({
    name: Joi.string().min(2).max(45),
    price: Joi.number(),
    category: Joi.string().min(2).max(24),
  }).min(1); // * At least one field must be present

  return updateSchema.validate(data);
};

exports.createArticle = async (req, res) => {
  const { error } = createNewArticle(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
    });
  }

  try {
    const article = await ArticleModel.create(req.body);
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({});
    res.status(200).json({
      message: "Articles found successfully",
      totalItems: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getArticleById = async (req, res) => {
  const { error: idError } = checkingId(req.params.id);

  if (idError) {
    return res.status(400).json({
      status: 400,
      message: `Article Id = ${req.params.id} is invalid !`,
    });
  }

  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article found successfully", article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  const { error: idError } = checkingId(req.params.id);

  if (idError) {
    return res.status(400).json({
      status: 400,
      message: `Article Id = ${req.params.id} is invalid !`,
    });
  }

  const { error: dataError } = updateArticle(req.body, { abortEarly: false });

  if (dataError) {
    const errorMessage = dataError.details.map((detail) => detail.message);
    return res.status(400).json({
      status: 400,
      message: "Invalid data",
    });
  }

  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res
      .status(200)
      .json({ message: "Article updated successfully", article: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const { error: idError } = checkingId(req.params.id);

  if (idError) {
    return res.status(400).json({
      status: 400,
      message: `Article Id = ${req.params.id} is invalid !`,
    });
  }

  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
