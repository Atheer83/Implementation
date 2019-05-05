var FeaturesGrid = function () {

    var clientsList = ko.observableArray();
    var productsList = ko.observableArray();

    // model for feature
    featureModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.title = ko.observable(item.title);
        this.data.description = ko.observable(item.description);
        this.data.client = ko.observable(item.client);
        this.data.product_area = ko.observable(item.product_area);
        this.data.client_priority = ko.observable(item.client_priority);
        this.data.target_date = ko.observable(item.target_date);
        this.displayMode = ko.observable(itemMode);
    };

    // model for client
    clientModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.name = ko.observable(item.name);
        this.displayMode = ko.observable(itemMode);
    };

    // model for product
    productModel = function (item, itemMode) {
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

    // list of products
    var products = ko.observableArray();

    // add a blank feature to the features array
    var addFeature = function (){
        var item = {
            title: null,
            description: null,
            client: null,
            product_area: null,
            client_priority: null,
            target_date: null,
           
            };
            features.push(new featureModel(item, displayMode.edit));
            getAllClients();
            getAllProducts();
        };

    var getAllClients = function () {
       var clientsObj = {};
       var listOfClients = clients();
       clientsList([])
       for (var i = 0; i < listOfClients.length; i++) {
            clientsObj['name'] = listOfClients[i].data.name();
            clientsObj['id'] = listOfClients[i].data.id();
            clientsList.push(clientsObj)
       }
        };

    var getAllProducts = function () {
        var productsObj = {};
        var listOfProducts = products();
        productsList([])
        for (var i = 0; i < listOfProducts.length; i++) {
                productsObj['name'] = listOfProducts[i].data.name();
                productsObj['id'] = listOfProducts[i].data.id();
                productsList.push(productsObj)
            }
            console.log(productsList)
        };

    // add a blank client to the clients array
    var addClient = function (){
        var item = {
            name: null,
            };
            clients.push(new clientModel(item, displayMode.edit));
    };

     // add a blank product to the products array
     var addProduct = function (){
        var item = {
            name: null,
            };
            products.push(new productModel(item, displayMode.edit));
    };

    // add rquest to the feature service
    var saveFeature = function (feature) {
        FeaturesClient.addFeature(feature, saveFeatureCallback);
    }

    // add rquest to the client service
    var saveClient = function (client) {
        ClientService.addClient(client, saveClientCallback);
    }

    // add rquest to the product service
    var saveProduct = function (product) {
        ProductService.addProduct(product, saveProductCallback);
    }

    // callback function for saving feature
    var saveFeatureCallback = function (feature) {
        // feature.displayMode (displayMode.view);
        fetchFeatures()
    };

    // callback function for saving client
    var saveClientCallback = function (client) {
        // feature.displayMode (displayMode.view);
        fetchClients();
        getAllClients()
    };

     // callback function for saving product
     var saveProductCallback = function (product) {
        // feature.displayMode (displayMode.view);
        fetchProducts();
        getAllProducts();
    };

    // delete rquest to the feature service
    var deleteFeature = function (feature) {
        FeaturesClient.deleteFeature(feature, deleteFeatureCallback);
    }

    // delete rquest to the client service
    var deleteClient = function (client) {
        ClientService.deleteClient(client, deleteClientCallback);
    }

    // delete rquest to the product service
    var deleteProduct = function (product) {
        ProductService.deleteProduct(product, deleteProductCallback);
    }

    // callback function for deleting feature
    var deleteFeatureCallback = function (feature) {
        features.remove(feature);
    };

    // callback function for deleting client
    var deleteClientCallback = function (client) {
        clients.remove(client);
    };

     // callback function for deleting product
     var deleteProductCallback = function (product) {
        products.remove(product);
    };

    // edit a feature
    var editFeature = function (feature) {
        feature.displayMode(displayMode.edit)
    }

    // edit a client
    var editClient = function (client) {
        client.displayMode(displayMode.edit)
    }

     // edit a product
     var editProduct = function (product) {
        product.displayMode(displayMode.edit)
    }

    // update rquest to the featur service
    var updateFeature = function (feature) {
        FeaturesClient.updateFeature(feature, updateFeatureCallback);
    }

      // update rquest to the client service
      var updateClient = function (client) {
        ClientService.updateClient(client, updateClientCallback);
    }

     // update rquest to the product service
     var updateProduct = function (product) {
        ProductService.updateProduct(product, updateProductCallback);
    }


    // callback function for updating feature
    var updateFeatureCallback = function (feature) {
        feature.displayMode(displayMode.view)

    }

    // callback function for updating client
    var updateClientCallback = function (client) {
        client.displayMode(displayMode.view)

    }

     // callback function for updating product
     var updateProductCallback = function (product) {
        product.displayMode(displayMode.view)

    }

    // get all features
    var fetchFeatures = function () {
        FeaturesClient.getFeatures(fetchFeaturesCallback)
    }

    // get all clients
    var fetchClients = function () {
        ClientService.getClients(fetchClientsCallback)
    }

     // get all products
     var fetchProducts = function () {
        ProductService.getProducts(fetchProductsCallback);
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

    // callback function for fetching products
    var fetchProductsCallback = function (data) {
        products([]);
        data.forEach(function(item) {
            products.push(new productModel(item, displayMode.view));
        });
    };

    var init = function () {
        fetchFeatures();
        fetchClients();
        fetchProducts();
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
        updateClient,
        products,
        addProduct,
        saveProduct,
        deleteProduct,
        editProduct,
        updateProduct,
        clientsList,
        productsList,

    };
}();