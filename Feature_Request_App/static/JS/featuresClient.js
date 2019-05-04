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

    // Update feature
    var updateFeature = function (feature, callback) {
        var plainFeature = ko.toJS (feature.data);
        console.log("Updating feature [" + JSON.stringify(plainFeature) + "] ");
        $.ajax({
            url: "/features/" + feature.data.id(),
            type: "PUT",
            data: JSON.stringify(plainFeature),
            contentType: "application/json",
            success: function(result) {
                callback (feature);
            }
        });
    };

    // Delete feature
    var deleteFeature = function (feature, callback) {
        console.log("Deleting feature with id [" + feature.data.id() + "] ");
        $.ajax({
            url: "/features/" + feature.data.id(),
            type: "DELETE",
            contentType: "application/json",
            success: function(result) {
                callback (feature);
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
        deleteFeature: deleteFeature,
        updateFeature: updateFeature,
    };
}();