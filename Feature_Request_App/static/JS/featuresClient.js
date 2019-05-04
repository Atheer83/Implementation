var FeaturesClient = function () {

    // Add feature
    var addFeature = function (feature, callback) {
        var plainFeature = ko.toJS (feature.data);
        console.log("Saving feature [" + JSON.stringify(plainFeature) + "] ");
        $.ajax({
            url: "/features",
            type: "POST",
            data: JSON.stringify(plainFeature),
            contentType: "application/json",
            success: function(result) {
                console.log(JSON.stringify(result))
                callback (feature, result);
            }
        });
    };

    // Get All features
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
        addFeature: addFeature,
        getFeatures: getFeatures,

    };
}();