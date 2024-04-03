const articleController = require("../controllers/article.controllers");
const ArticleModel = require("../models/article.model");

// simulation
jest.mock("../models/article.model", () => ({
  create: jest.fn(), // simulation function create
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// regrouper les test
describe("Article Controller Tests", () => {
  
  describe("create a new Article", () => {
    
    it("should create a new article", async () => {
      const req = {
        body: {
          name: "Test Article",
          price: 10,
          category: "Test Category",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // mock the ArticleModel.create function
      ArticleModel.create.mockResolvedValueOnce(req.body); // test model

      await articleController.createArticle(req, res); // test controller create

      expect(ArticleModel.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article created successfully",
        article: req.body,
      });
    });

    
    test("should return error for missing fields", async () => {
      // missing name field
      const req = { body: { price: 10, category: "Test Category" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await articleController.createArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "All fields are required",
      });
    });
  });


  describe("get All Articles", () => {
   
    test("should return all articles", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const articles = [
        { name: "Test Article", price: 10, category: "Test Category" },
        { name: "Test Article", price: 10, category: "Test Category" },
      ];

      ArticleModel.find.mockResolvedValueOnce(articles);

      await articleController.getAllArticles(req, res);

      expect(ArticleModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Articles found successfully",
        totalItems: articles.length,
        articles,
      });
    });
  });

 
  describe("get an Article By Id", () => {
    
    test("should return article if ID is valid and article exists", async () => {
      // Mock article data
      const articleData = {
        _id: "5f7777777777777777777777",
        name: "Test Article",
        price: 10,
        category: "Test Category",
      };

      // Mock request object
      const req = {
        params: { id: articleData._id },
      };

      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock ArticleModel.findById to return article data
      ArticleModel.findById.mockResolvedValueOnce(articleData);

      // Call the controller function
      await articleController.getArticleById(req, res);

      // Expectations
      expect(ArticleModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article found successfully",
        article: articleData,
      });
    });

    /**
     * @test {should return error if ID is not valid}
     */
    test("should return error if ID is not valid", async () => {
      const req = {
        body: {
          name: "Test Article",
          price: 10,
          category: "Test Category",
        },
        params: { id: "5f77777777777777777777k" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await articleController.getArticleById(req, res);

      // Ensure ArticleModel.findByIdAndUpdate is not called
      expect(ArticleModel.findById).not.toHaveBeenCalledWith();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: `Article Id = ${req.params.id} is invalid !`,
      });
    });

    /**
     * @test {should return error if article is not found}
     */
    test("should return error if article is not found", async () => {
      // Mock request object
      const req = {
        params: { id: "5f7777777777777777777777" }, // Non-existing ID
      };

      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock ArticleModel.findById to return null, simulating article not found
      ArticleModel.findById.mockResolvedValueOnce(null);

      // Call the controller function
      await articleController.getArticleById(req, res);

      // Expectations
      expect(ArticleModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article not found",
      });
    });

    /**
     * @test {should return error if there is an internal server error}
     */
    test("should return error if there is an internal server error", async () => {
      // Mock request object
      const req = {
        params: { id: "5f7777777777777777777777" }, // Existing ID
      };

      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock ArticleModel.findById to throw an error, simulating an internal server error
      ArticleModel.findById.mockRejectedValueOnce(
        new Error("Internal server error")
      );

      // Call the controller function
      await articleController.getArticleById(req, res);

      // Expectations
      expect(ArticleModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  /**
   * @testcase {updateArticle}
   */
  describe("Update an article", () => {
    /**
     * @test {should update an article}
     */
    test("should update an article", async () => {
      const req = {
        body: {
          name: "Updated Article",
          price: 10,
          category: "Test Category",
        },
        params: { id: "5f7777777777777777777777" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const article = {
        name: "Test Article",
        price: 10,
        category: "Test Category",
      };

      ArticleModel.findByIdAndUpdate.mockResolvedValueOnce(article);

      await articleController.updateArticle(req, res);

      expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        req.body,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article updated successfully",
        article,
      });
    });

    /**
     * @test {should return error if ID is not valid}
     */
    test("should return error if ID is not valid", async () => {
      const req = {
        body: {
          name: "Updated Article",
          price: 10,
          category: "Test Category",
        },
        params: { id: "5f77777777777777777777k" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await articleController.updateArticle(req, res);

      // Ensure ArticleModel.findByIdAndUpdate is not called
      expect(ArticleModel.findByIdAndUpdate).not.toHaveBeenCalledWith();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: `Article Id = ${req.params.id} is invalid !`,
      });
    });

    /**
     * @test {should return error if article is not found}
     */
    test("should return error if article is not found", async () => {
      const req = {
        body: {
          name: "Updated Article",
          price: 10,
          category: "Test Category",
        },
        params: { id: "5f7777777777777777777777" }, // Valid Id but article not exist
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mock ArticleModel.findByIdAndUpdate to return null, simulating article not found
      ArticleModel.findByIdAndUpdate.mockResolvedValueOnce(null);

      await articleController.updateArticle(req, res);

      // Ensure the correct response is sent
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article not found",
      });
    });

    /**
     * @testcase {should return error for missing fields}
     */
    test("should return error for missing fields", async () => {
      // missing name field
      const req = {
        body: { category: "" },
        params: { id: "5f7777777777777777777777" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await articleController.updateArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Invalid data",
      });
    });
  });

  /**
   * @testcase {deleteArticle}
   */
  describe("Delete an Article", () => {
    /**
     * @test {should delete an article}
     */
    test("should delete an article", async () => {
      // Mocked article data
      const articleData = {
        _id: "5f7777777777777777777777",
        name: "Test Article",
        price: 10,
        category: "Test Category",
      };

      // Mock request object
      const req = {
        params: { id: articleData._id },
      };

      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock ArticleModel.findByIdAndDelete to return article data
      ArticleModel.findByIdAndDelete.mockResolvedValueOnce(articleData);

      // Call the controller function
      await articleController.deleteArticle(req, res);

      // Expectations
      expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledWith(
        req.params.id
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Article deleted successfully",
      });
    });

    /**
     * @test {should return error if ID is invalid}
     */
    test("should return error if ID is invalid", async () => {
      const req = {
        params: { id: "invalid_id" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await articleController.deleteArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: `Article Id = ${req.params.id} is invalid !`,
      });
    });

    /**
     * @test {should return error if article is not found}
     */
    test("should return error if article is not found", async () => {
      const req = {
        params: { id: "5f7777777777777777777777" }, // Non-existing ID
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mock ArticleModel.findByIdAndDelete to return null, simulating article not found
      ArticleModel.findByIdAndDelete.mockResolvedValueOnce(null);

      await articleController.deleteArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Article not found" });
    });
  });
});
