const { Comment, Users } = require("../models");

class CommentController {
  static async addComment(req, res, next) {
    try {
      const userId = req.user.id;
      const productId = req.params.id;
      const { content } = req.body;
      await Comment.create({
        userId,
        productId,
        content,
      });
      res.status(201).send("Comment added!");
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const commentId = req.params.id;
      await Comment.destroy({
        where: {
          id: commentId,
        },
      });
      res.status(200).send("Comment deleted!");
    } catch (err) {
      next(err);
    }
  }

  static async getComments(req, res, next) {
    try {
      const productId = req.params.id;
      const comments = await Comment.findAll({
        where: {
          productId,
        },
        include: { model: Users },
      });
      res.status(200).send(comments);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommentController;
