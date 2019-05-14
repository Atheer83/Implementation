var ProductService = function () {

    // Send POST Request for Adding a Product
    var addProduct = function (product, callback) {
        var plainProduct = ko.toJS (product);
        $.ajax({
            url: "/products",
            type: "POST",
            data: JSON.stringify(plainProduct),
            contentType: "application/json",
            success: function(result) {
                callback (product);
            }
        });
    };

    // Send PUT Request for Updatting a Product
    var updateProduct = function (product, callback) {
        var plainProduct = ko.toJS (product.data);
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

    // Send DELETE Request for Deletting a Product
    var deleteProduct = function (product, callback) {
        $.ajax({
            url: "/products/" + product.data.id(),
            type: "DELETE",
            success: function(result) {
                callback (product);
            }
        });
    };

    // Send GET Request for Getting All Products
    var getProducts = function (callback) {
        $.ajax({
            url: "/products",
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    };

     // Send GET Request for Getting a  Product area features
     var getProductFeatures = function (productId, callback) {
        $.ajax({
            url: "/productFeatures/" + productId,
            type: "GET",
            success: function (result) {
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