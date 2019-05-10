var ProductService = function () {

    // Add Product
    var addProduct = function (product, callback) {
        var plainProduct = ko.toJS (product);
        console.log("Saving Product [" + JSON.stringify(plainProduct) + "] ");
        $.ajax({
            url: "/products",
            type: "POST",
            data: JSON.stringify(plainProduct),
            contentType: "application/json",
            success: function(result) {
                console.log(JSON.stringify(result))
                callback (product);
            }
        });
    };

    // Update Product
    var updateProduct = function (product, callback) {
        var plainProduct = ko.toJS (product.data);
        console.log("Updating Product [" + JSON.stringify(plainProduct) + "] ");
        $.ajax({
            url: "/products/" + product.data.id(),
            type: "PUT",
            data: JSON.stringify(plainProduct),
            contentType: "application/json",
            success: function(result) {
                callback (product);
            }
        });
    };

    // Delete Product
    var deleteProduct = function (product, callback) {
        $.ajax({
            url: "/products/" + product.data.id(),
            type: "DELETE",
            success: function(result) {
                console.log(result)
                callback (product);
            }
        });
    };

    // Get All Products
    var getProducts = function (callback) {
        $.ajax({
            url: "/products",
            type: "GET",
            success: function (result) {
                console.log("Products", JSON.stringify(result));
                callback (result);
            }
        });
    };

     // Get  Product area features
     var getProductFeatures = function (productId, callback) {
        $.ajax({
            url: "/productFeatures/" + productId,
            type: "GET",
            success: function (result) {
                console.log("product features", JSON.stringify(result));
                callback (result);
            }
        });
    };

    return {
        addProduct,
        getProducts,
        deleteProduct,
        updateProduct,
        getProductFeatures,
    };
}();