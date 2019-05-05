var FeaturesGrid = function () {
    // model for feature
    featureModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.title = ko.observable(item.title);
        this.data.description = ko.observable(item.description);
        this.data.client = ko.observable(item.client);
        // this.data.client_priority = ko.observable(item.client_priority);
        // this.data.target_date = ko.observable(item.target_date);
        this.data.product_area = ko.observable(item.product_area);
        this.displayMode = ko.observable(itemMode);
    };

    // model for client
    clientModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.name = ko.observable(item.name);
        this.displayMode = ko.observable(itemMode);
    };

    // display modes for the grid
    var displayMode = {
        view: "VIEW",
        edit: "EDIT"
    }

    // list of features
    var features = ko.observableArray();

    // list of clients
    var clients = ko.observableArray();

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
            features.push(new featureModel(item, displayMode.edit));
    };

    // add a blank client to the clients array
    var addClient = function (){
        var item = {
            name: null,
            };
            clients.push(new clientModel(item, displayMode.edit));
    };

    // add rquest to the feature service
    var saveFeature = function (feature) {
        FeaturesClient.addFeature(feature, saveFeatureCallback);
    }

    // add rquest to the client service
    var saveClient = function (client) {
        ClientService.addClient(client, saveClientCallback);
    }

    // callback function for saving feature
    var saveFeatureCallback = function (feature) {
        // feature.displayMode (displayMode.view);
        fetchFeatures()
    };

    // callback function for saving client
    var saveClientCallback = function (client) {
        // feature.displayMode (displayMode.view);
        fetchClients()
    };

    // delete rquest to the feature service
    var deleteFeature = function (feature) {
        FeaturesClient.deleteFeature(feature, deleteFeatureCallback);
    }

    // delete rquest to the client service
    var deleteClient = function (client) {
        ClientService.deleteClient(client, deleteClientCallback);
    }

    // callback function for deleting feature
    var deleteFeatureCallback = function (feature) {
        features.remove(feature);
    };

    // callback function for deleting client
    var deleteClientCallback = function (client) {
        clients.remove(client);
    };

    // edit a feature
    var editFeature = function (feature) {
        feature.displayMode(displayMode.edit)
    }

    // edit a client
    var editClient = function (client) {
        client.displayMode(displayMode.edit)
    }

    // update rquest to the featur service
    var updateFeature = function (feature) {
        FeaturesClient.updateFeature(feature, updateFeatureCallback);
    }

      // update rquest to the client service
      var updateClient = function (client) {
        ClientService.updateClient(client, updateClientCallback);
    }


    // callback function for updating feature
    var updateFeatureCallback = function (feature) {
        feature.displayMode(displayMode.view)

    }

    // callback function for updating client
    var updateClientCallback = function (client) {
        client.displayMode(displayMode.view)

    }

    // get all features
    var fetchFeatures = function () {
        FeaturesClient.getFeatures(fetchFeaturesCallback)
    }

    // get all clients
    var fetchClients = function () {
        ClientService.getClients(fetchClientsCallback)
    }

    // callback function for fetching feature
    var fetchFeaturesCallback = function (data) {
        features([]);
        data.forEach(function(item) {
            features.push(new featureModel(item, displayMode.view));
        });
    };

    // callback function for fetching clients
    var fetchClientsCallback = function (data) {
        clients([]);
        data.forEach(function(item) {
            clients.push(new clientModel(item, displayMode.view));
        });
    };

    var init = function () {
        fetchFeatures();
        fetchClients();
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
        clients,
        addClient,
        saveClient,
        deleteClient,
        editClient,
        updateClient

    };
}();