const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
    create,
    listOrder,
    getStatusValues,
    updateOrderStatus,
    orderById,
    listUserOrder,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");
router.post(
    "/order/create/:userId",
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);
router.get("/order/list/user/:userId", requireSignin, isAuth, listUserOrder);
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrder);
router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);
router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
