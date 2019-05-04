var FeaturesGrid = function () {

    // model for feature
    featureModel = function (item, itemMode) {
        this.data = {};
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
        saveFeature

    };
}();