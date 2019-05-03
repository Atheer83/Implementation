var FeaturesGrid = function () {

    featureModel = function (item) {
        this.data = {}
        this.data.title = ko.observable(item.title);
        this.data.description = ko.observable(item.description)
        this.data.client = ko.observable(item.client);
        this.data.client_priority = ko.observable(item.client_priority)
        this.data.target_date = ko.observable(item.target_date);
        this.data.product_area = ko.observable(item.product_area)
    };

    var features = ko.observableArray();

    var fetchFeatures = function () {
        FeaturesClient.getFeatures(fetchFeaturesCallback)
    }

    var fetchFeaturesCallback = function (data) {
        data.forEach(function(item) {
            features.push(new featureModel(item));
        });
    };

    var init = function () {
        fetchFeatures();
        ko.applyBindings(FeaturesGrid); 
    };

    $(init);

    return {
        features
    };
}();