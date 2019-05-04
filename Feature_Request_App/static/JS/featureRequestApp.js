var FeaturesGrid = function () {
    // model for feature
    featureModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.title = ko.observable(item.title);
        this.data.description = ko.observable(item.description);
        this.data.client = ko.observable(item.client);
        this.data.client_priority = ko.observable(item.client_priority);
        this.data.target_date = ko.observable(item.target_date);
        this.data.product_area = ko.observable(item.product_area);
        this.displayMode = ko.observable(itemMode);
    };

    // display modes for the grid
    var displayMode = {
        view: "VIEW",
        edit: "EDIT"
    }

    var features = ko.observableArray();

    // add a blank feature to the features array
    var addFeature = function (){
        var item = {
            title: null,
            description: null,
            client: null,
            // client_priority: null,
            // target_date: null,
            product_area: null
            };
            features.unshift(new featureModel(item, displayMode.edit));
    };

    // add rquest to the client
    var saveFeature = function (feature) {
        FeaturesClient.addFeature(feature, saveFeatureCallback);
    }

    var saveFeatureCallback = function (feature) {
        feature.displayMode ();
    };

    // delete rquest to the client
    var deleteFeature = function (feature) {
        FeaturesClient.deleteFeature(feature, deleteFeatureCallback);
    }

    var deleteFeatureCallback = function (feature) {
        features.remove(feature);
    };

    // edit a feature
    var editFeature = function (feature) {
        feature.displayMode(displayMode.edit)
    }

    // update rquest to the client
    var updateFeature = function (feature) {
        FeaturesClient.updateFeature(feature, updateFeatureCallback);
    }

    var updateFeatureCallback = function (feature) {
        feature.displayMode(displayMode.view)
    }

    var fetchFeatures = function () {
        FeaturesClient.getFeatures(fetchFeaturesCallback)
    }

    var fetchFeaturesCallback = function (data) {
        data.forEach(function(item) {
            features.push(new featureModel(item, displayMode.view));
        });
    };

    var init = function () {
        fetchFeatures();
        ko.applyBindings(FeaturesGrid); 
    };

    $(init);

    return {
        features,
        displayMode,
        addFeature,
        saveFeature,
        deleteFeature,
        editFeature,
        updateFeature,

    };
}();