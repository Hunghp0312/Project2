const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandle");
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        const { name, description, price, category, quantity } = fields;
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }
        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: "File image should be less than 10mb in size",
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(result);
        });
    });
};
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found",
            });
        }
        req.product = product;
        next();
    });
};
exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            deletedProduct,
            message: "Product is deleted",
        });
    });
};
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        // const { name, description, price, category, quantity } = fields;
        // if (!name || !description || !price || !category || !quantity) {
        //     return res.status(400).json({
        //         error: "All fields are required",
        //     });
        // }
        let product = req.product;
        product = _.extend(product, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "File image should be less than 1mb in size",
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(result);
        });
    });
};
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? req.query.limit : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "product not found",
                });
            }
            res.json(data);
        });
};
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 3;
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "product not found",
                });
            }
            res.json(data);
        });
};
exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found",
            });
        }
        res.json(data);
    });
};
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found",
                });
            }
            res.json({
                size: data.length,
                data,
            });
        });
};
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};
exports.listSearch = (req, res) => {
    //create query object to hold search value and category value
    const query = {};
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };

        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        console.log(query);
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(products);
        }).select("-photo");
    }
};
exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.orderDetails.map((item) => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });
    Product.bulkWrite(bulkOps, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Could not update",
            });
        }
        next();
    });
};
