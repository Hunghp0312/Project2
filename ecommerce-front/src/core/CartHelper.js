export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count: 1,
        });

        cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
            return cart.find((p) => p._id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        next();
    }
};
export const updateProduct = (productId, count) => {
    let cart = [];
    let updated = 1;
    if (typeof window !== "undefined") {
        if (localStorage.getItem("updated")) {
            updated = JSON.parse(localStorage.getItem("updated"));
        }
        if (updated === 0) {
            updated = 1;
        } else {
            updated = 0;
        }
        localStorage.setItem("updated", JSON.stringify(updated));
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};
export const removeProduct = (productId) => {
    let cart = [];
    let updated = 0;
    if (typeof window !== "undefined") {
        if (localStorage.getItem("updated")) {
            updated = JSON.parse(localStorage.getItem("updated"));
        }
        if (updated === 0) {
            updated = 1;
        } else {
            updated = 0;
        }
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("updated", JSON.stringify(updated));
    }
    return cart;
};
export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};
export const emptyCart = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
    }
    next();
};
