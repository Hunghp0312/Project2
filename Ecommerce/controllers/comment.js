const { errorHandler } = require("../helpers/dbErrorHandle");
const Comment = require("../models/comment");
exports.create = (req, res) => {
    req.body.comment.user = req.profile;
    req.body.comment.product = req.product;
    req.body.comment;
    const comment = new Comment(req.body.comment);
    comment.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error),
            });
        }
        res.json(data);
    });
};
exports.listComment = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 6;
    let skip = parseInt(req.body.skip);
    console.log(skip);
    Comment.find({ product: req.product })

        .populate("user", "_id name")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)

        .exec((err, comments) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(comments);
        });
};
exports.commentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
        if (err || !comment) {
            return res.status(400).json({
                error: "Comment not found",
            });
        }
        req.comment = comment;
        next();
    });
};
exports.deleteComment = (req, res) => {
    let comment = req.comment;
    comment.remove((err, deletedComment) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            deletedComment,
            message: "Comment is deleted",
        });
    });
};
