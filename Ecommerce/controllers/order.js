const { errorHandler } = require("../helpers/dbErrorHandle");
const Order = require("../models/order");
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("orderDetails.product", "name price")
        .exec((err, order) => {
            console.log(order);
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            req.order = order;
            next();
        });
};
exports.create = (req, res) => {
    //console.log("CREATE ORDER ", req.body);

    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    console.log(order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error),
            });
        }
        res.json(data);
    });
};
exports.listOrder = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            console.log(orders);
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(orders);
        });
};
exports.listUserOrder = (req, res) => {
    Order.find({ user: req.profile })
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            console.log(orders);
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(orders);
        });
};
exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(order);
        }
    );
};
