var FeaturesService = function () {

    // Send POST Request for Adding a feature
    var addFeature = function (feature, callback) {
        var plainFeature = ko.toJS (feature);
        $.ajax({
            url: "/features",
            type: "POST",
            data: JSON.stringify(plainFeature),
            contentType: "application/json",
            success: function(result) {
                callback ();
            }
        });
    };

    // Send PUT Request for Updatting a feature
    var updateFeature = function (feature, callback) {
        var plainFeature = ko.toJS (feature.data);
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

    // Send DELETE Request for Delete a feature
    var deleteFeature = function (feature, callback) {
        $.ajax({
            url: "/features/" + feature.data.id(),
            type: "DELETE",
            success: function(result) {
                callback (feature);
            }
        });
    };

    // Send GET Request for Get All features
    var getFeatures = function (callback) {
        $.ajax({
            url: "/features",
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    };

    // Send GET Request for Rebuild Database
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
        addFeature,
        getFeatures,
        deleteFeature,
        updateFeature,
        rebuildDatabase,
    };
}();