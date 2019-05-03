var FeaturesClient = function () {

    var getFeatures = function (callback) {
        $.ajax({
            url: "/features",
            type: "GET",
            success: function (result) {
                console.log("Features", JSON.stringify(result));
                callback (result);
            }
        });
    };
    return {
        getFeatures: getFeatures
    };
}();