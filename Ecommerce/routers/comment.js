const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { productById } = require("../controllers/product");
const {
    create,
    listComment,
    commentById,
    deleteComment,
} = require("../controllers/comment");

router.post(
    "/comment/create/:userId/:productId",
    requireSignin,
    isAuth,
    create
);
router.post("/comment/list/:productId", listComment);
router.delete(
    "/comment/delete/:userId/:commentId",
    requireSignin,
    isAuth,
    isAdmin,
    deleteComment
);
router.param("userId", userById);
router.param("productId", productById);
router.param("commentId", commentById);
module.exports = router;
