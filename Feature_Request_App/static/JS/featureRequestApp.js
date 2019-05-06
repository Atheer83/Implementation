var FeaturesGrid = function () {
    
    // list of all clients 
    var clientsList = ko.observableArray();

    // list of all products area 
    var productsList = ko.observableArray();

    // model for adding feature
    var addFeatureModel = function () {
        this.id = ko.observable(item.id);
        this.title = ko.observable(item.title);
        this.description = ko.observable(item.description);
        this.client_id = ko.observable(item.client_id);
        this.product_area_id = ko.observable(item.product_area_id);
        this.client_priority = ko.observable(item.client_priority);
        this.target_date = ko.observable(item.target_date);
        this.displayMode = ko.observable(itemMode);
    } 

    // model for adding client
    var addClientModel = function () {
        this.id = ko.observable(item.id);
        this.clientName = ko.observable(item.name);
    } 

    // model for adding product area
    var addProductModel = function () {
        this.id = ko.observable(item.id);
        this.productName = ko.observable(item.name);
    } 

    // model for feature
    featureModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.title = ko.observable(item.title);
        this.data.description = ko.observable(item.description);
        this.data.client_id = ko.observable(item.client_id);
        this.data.product_area_id = ko.observable(item.product_area_id);
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

    // show modal to add feature
    var addFeature = function (){ 
            getAllClients();
            getAllProducts();
        };

    var getAllClients = function () {
       var clientsObj = {};
       var listOfClients = clients();
       clientsList([])
       for (var i = 0; i < listOfClients.length; i++) {
            clientsObj = {};
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
                productsObj = {};
                productsObj['name'] = listOfProducts[i].data.name();
                productsObj['id'] = listOfProducts[i].data.id();
                productsList.push(productsObj)
            }
        };

    // add a blank client to the clients array
    var addClient = function (){
    };

     // add a blank product to the products array
     var addProduct = function (){
    };

    // add rquest to the feature service
    var saveFeature = function () {
        var feature = {
            'title':addFeatureModel.title,
            'description':addFeatureModel.description,
            'client_id':addFeatureModel.client_id,
            'product_area_id':addFeatureModel.product_area_id,
            'client_priority':addFeatureModel.client_priority,
            'target_date':addFeatureModel.target_date,
        }
        FeaturesClient.addFeature(feature, saveFeatureCallback);
    }

    // add rquest to the client service
    var saveClient = function () {
        var client = {
            'name':addClientModel.clientName,
        }
        console.log(client)
        ClientService.addClient(client, saveClientCallback);
    }

    // add rquest to the product service
    var saveProduct = function (product) {
        var product = {
            'name':addProductModel.productName,
        }
        ProductService.addProduct(product, saveProductCallback);
    }

    // callback function for saving feature
    var saveFeatureCallback = function (e) {
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
        getAllClients();
        getAllProducts();
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
        fetchFeatures()
    }

    // callback function for updating client
    var updateClientCallback = function (client) {
        client.displayMode(displayMode.view)
        fetchClients()
    }

     // callback function for updating product
     var updateProductCallback = function (product) {
        product.displayMode(displayMode.view)
        fetchProducts()
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
            var date = new Date(item.target_date)
            var newDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
            item.target_date = newDate;
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

    var showFeaturesTable = function(e) {
        e.enableFeaturesTable(true)
        e.enableClientsTable(false)
        e.enableProductsTable(false)
    }
    var showClientsTable = function(e) {
        e.enableFeaturesTable(false)
        e.enableClientsTable(true)
        e.enableProductsTable(false)
    }
    var showProductsTable = function(e) {
        e.enableFeaturesTable(false)
        e.enableClientsTable(false)
        e.enableProductsTable(true)
    }
    
    var enableFeaturesTable = ko.observable(true)
    var enableClientsTable = ko.observable(false)
    var enableProductsTable = ko.observable(false)



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
        showFeaturesTable,
        showClientsTable,
        showProductsTable,
        enableFeaturesTable,
        enableClientsTable,
        enableProductsTable,
        addFeatureModel,
        addClientModel,
        addProductModel

    };
}();
