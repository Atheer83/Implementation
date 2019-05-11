var FeaturesClient = function () {

    // Add feature
    var addFeature = function (feature, callback) {
        var plainFeature = ko.toJS (feature);
        console.log("Saving feature [" + JSON.stringify(plainFeature) + "] ");
        $.ajax({
            url: "/features",
            type: "POST",
            data: JSON.stringify(plainFeature),
            contentType: "application/json",
            success: function(result) {
                console.log(JSON.stringify(result))
                callback ();
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
        $.ajax({
            url: "/features/" + feature.data.id(),
            type: "DELETE",
            success: function(result) {
                console.log(result)
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

    var rebuildDatabase = function(callback) {
        $.ajax({
            url: "/rebuildDatabase",
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    }

    return {
        addFeature: addFeature,
        getFeatures: getFeatures,
        deleteFeature: deleteFeature,
        updateFeature: updateFeature,
        rebuildDatabase,
    };
}();