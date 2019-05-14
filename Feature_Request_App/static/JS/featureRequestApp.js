var FeaturesGrid = function () {
    
    // list of all clients 
    var clientsList = ko.observableArray();

    // list of all products area 
    var productsList = ko.observableArray();

    // list of all features
    var features = ko.observableArray()

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

    // model for adding feature to features array
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

    // model for adding client to clients array
    clientModel = function (item, itemMode) {
        this.data = {};
        this.data.id = ko.observable(item.id);
        this.data.name = ko.observable(item.name);
        this.displayMode = ko.observable(itemMode);
    };

    // model for adding product to products array
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

   
    // To sort features by priority
    var sortBy = function() {
        features.sort(function(left, right){
            return left.data.client_priority() == right.data.client_priority() ? 
            0 : left.data.client_priority() < right.data.client_priority() ? -1 : 1
        });
    }

    // list of clients to binding them to client dropdownlist
    var clients = ko.observableArray();
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

    // list of product areas to binding them to product area dropdownlist
    var products = ko.observableArray();
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

    // show popup form to add feature
    var addFeature = function (){ 
            getAllClients();
            getAllProducts();
    };

    // show popup form to add client
    var addClient = function (){
    };

     // show popup form to add product
     var addProduct = function (){
    };

    // call method to send post rquest from feature service and run callback on success
    var saveFeature = function () {
        document.getElementById("addFeatureForm").reset();
        var feature = {
            'title':addFeatureModel.title,
            'description':addFeatureModel.description,
            'client_id':addFeatureModel.client_id,
            'product_area_id':addFeatureModel.product_area_id,
            'client_priority':addFeatureModel.client_priority,
            'target_date':addFeatureModel.target_date,
        }
        FeaturesService.addFeature(feature, saveFeatureCallback);
        validSubmit(false)
    }
    var saveFeatureCallback = function () {
        fetchFeatures() 
        getAllClients();
        getAllProducts(); 
        sortBy() 
    };

    // call method to send post rquest from client service and run callback on success
    var saveClient = function () {
        document.getElementById("addClientForm").reset();
        var client = {
            'name':addClientModel.clientName,
        }
        ClientService.addClient(client, saveClientCallback);
    }
    var saveClientCallback = function () {
        addClientModel.name = undefined;
        fetchClients();
        getAllClients()
    };

    // call method to send post rquest from product service and run callback on success
    var saveProduct = function (product) {
        document.getElementById("addProductForm").reset();
        var product = {
            'name':addProductModel.productName,
        }
        ProductService.addProduct(product, saveProductCallback);
    }
    var saveProductCallback = function () {
        addProductModel.name = undefined;
        fetchProducts();
        getAllProducts();
    };

    // call method to send delete rquest from feature service and run callback on success
    var deleteFeature = function (feature) {
        FeaturesService.deleteFeature(feature, deleteFeatureCallback);
    }
    var deleteFeatureCallback = function (feature) {
        features.remove(feature);
    };

    // call method to send delete rquest from client service and run callback on success
    var deleteClient = function (client) {
        ClientService.deleteClient(client, deleteClientCallback);
    }
    var deleteClientCallback = function (client) {
        clients.remove(client);
    };

    var deleteProduct = function (product) {
        ProductService.deleteProduct(product, deleteProductCallback);
    }
    var deleteProductCallback = function (product) {
        products.remove(product);
    };
    
    // bind feature data for editting
    var editFeature = function (feature) {
        feature.displayMode(displayMode.edit)
        var dateControl = $('input[type="date"]');
        var targetDate = feature.data.target_date();
        dateControl.value = targetDate;
    }

    // bind client data for editting
    var editClient = function (client) {
        client.displayMode(displayMode.edit)
    }

    // bind product data for editting
    var editProduct = function (product) {
        product.displayMode(displayMode.edit)
    }

    // show client name by switching client id to client name
    var showClientNametById = function(clientId){
        if(clientsList()[clientId - 1]) {
            return clientsList()[clientId - 1].name
        }
    }

    // show product name by switching product id to product name
    var showProductNameById = function(productId){
         if(productsList()[productId - 1] ) {
            return productsList()[productId - 1].name
         }
    }
    

    // call method to send put rquest from feature service and run callback on success
    var updateFeature = function (feature) {
        FeaturesService.updateFeature(feature, updateFeatureCallback);
    }
    var updateFeatureCallback = function (feature) {
        feature.displayMode(displayMode.view)
        fetchFeatures()
        sortBy() 
    }

    // call method to send put rquest from client service and run callback on success
    var updateClient = function (client) {
        ClientService.updateClient(client, updateClientCallback);
    }
    var updateClientCallback = function (client) {
        client.displayMode(displayMode.view)
        fetchClients()
    }

    // call method to send put rquest from product service and run callback on success
    var updateProduct = function (product) {
        ProductService.updateProduct(product, updateProductCallback);
    }
    var updateProductCallback = function (product) {
        product.displayMode(displayMode.view)
        fetchProducts()
    }

    // Rebuild Database
    var rebuildDatabase = function() {
        FeaturesService.rebuildDatabase(rebuildDatabaseCallback)
    }
    var rebuildDatabaseCallback = function() {
        fetchFeatures()
        fetchClients()
        fetchProducts()
        sortBy() 
    }
   
    // call method to send get rquest from feature service and run callback on success    
    var fetchFeatures = function () {
        FeaturesService.getFeatures(fetchFeaturesCallback)
    }
    var fetchFeaturesCallback = function (data) {
        features([]);
        data.forEach(function(item) {
            adjustDateFormat(item)
            features.push(new featureModel(item, displayMode.view));
        });
        sortBy();
    };

    // call method to send get rquest from client service and run callback on success    
    var fetchClients = function () {
        ClientService.getClients(fetchClientsCallback)
    }
    var fetchClientsCallback = function (data) {
        clients([]);
        data.forEach(function(item) {
            clients.push(new clientModel(item, displayMode.view));
        });
        getAllClients()
    };

    // call method to send get rquest from product service and run callback on success    
    var fetchProducts = function () {
        ProductService.getProducts(fetchProductsCallback);
    }
    var fetchProductsCallback = function (data) {
        products([]);
        data.forEach(function(item) {
            products.push(new productModel(item, displayMode.view));
        });
        getAllProducts();
    };
   
    // show tabels functions that run on click for buttons on sections side
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
    
    // enable save button when add feature if all info putted
    var enableDisableSubmit = function (valid) {
        validSubmit(valid)
    }

    // check form validation on each input or change to add feature form
    var formValidation = function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('change', function(event) {
            if (form.checkValidity() === false) {
              FeaturesGrid.enableDisableSubmit(false)
            } else {
              FeaturesGrid.enableDisableSubmit(true)
            }
            form.classList.add('was-validated');
          }, false);
        });
    }
    
    // show features table when web app run
    var enableFeaturesTable = ko.observable(true)
    var enableClientsTable = ko.observable(false)
    var enableProductsTable = ko.observable(false)
    var validSubmit = ko.observable()

    // call method to send get rquest to get all features for a client 
    var filtterFeaturesByClient = function(e){
        var clientId = e.addFeatureModel.client_id;
        var productId = e.addFeatureModel.product_area_id;
        if(clientId !== undefined && productId === undefined) {
            ClientService.getClientFeatures(clientId, filtterFeaturesByClientCallback)
        } else if (clientId !== undefined && productId !== undefined) {
            ClientService.getClientProductFeatures(clientId, productId, filtterFeaturesByClientProductCallback)
        } else if (clientId === undefined && productId !== undefined) {
            ProductService.getProductFeatures(productId, filtterFeaturesByProductCallback)
        } else {
            fetchFeatures(); 
            sortBy() 
        }
    }

    // call method to send get rquest to get all features for a product 
    var filtterFeaturesByProduct = function(e){
        var clientId = e.addFeatureModel.client_id;
        var productId = e.addFeatureModel.product_area_id;
        if(productId !== undefined && clientId === undefined) {
            ProductService.getProductFeatures(productId, filtterFeaturesByProductCallback)
        } else if (productId !== undefined && clientId !== undefined) {
            ClientService.getClientProductFeatures(clientId, productId, filtterFeaturesByClientProductCallback)
        } else if (productId === undefined && clientId !== undefined) {
            ClientService.getClientFeatures(clientId, filtterFeaturesByClientCallback)
        } else {
            fetchFeatures(); 
            sortBy() 
        }
    }

    // callback methods for each filtter get requst on success
    var filtterFeaturesByClientCallback = function(data) {
        features([]);
        data.forEach(function(item) {
            adjustDateFormat(item);
            features.push(new featureModel(item, displayMode.view));
        });
        sortBy() 
    }
    var filtterFeaturesByProductCallback = function(data) {
        features([]);
        data.forEach(function(item) {
            adjustDateFormat(item);
            features.push(new featureModel(item, displayMode.view));
        });
        sortBy() 
    }
    var filtterFeaturesByClientProductCallback = function(data) {
        features([]);
        data.forEach(function(item) {
            adjustDateFormat(item);
            features.push(new featureModel(item, displayMode.view));
        });
        sortBy() 
    }

    // to bind date on edit feature
    var adjustDateFormat = function (item) {
        var date = new Date(item.target_date);
        var day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() <= 8 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1;
        var newDate = date.getFullYear() + '-' + month + '-' + day; 
        item.target_date = newDate;
    }

   
    // select methods that will run when page finish load 
    var init = function () {
        fetchFeatures();
        fetchClients();
        fetchProducts();
        formValidation();
        ko.applyBindings(FeaturesGrid); 
    };

    // run init function when page finish load
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
        addProductModel,
        filtterFeaturesByClient,
        filtterFeaturesByProduct,
        showClientNametById,
        showProductNameById,
        validSubmit,
        enableDisableSubmit,
        rebuildDatabase,
    };
}();
