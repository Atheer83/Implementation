var ClientService = function () {

    // Send POST Request for Adding a Client
    var addClient = function (client, callback) {
        var plainClient = ko.toJS (client);
        $.ajax({
            url: "/clients",
            type: "POST",
            data: JSON.stringify(plainClient),
            contentType: "application/json",
            success: function(result) {
                callback (client);
            }
        });
    };

    // Send PUT Request for Updatting a Client
    var updateClient = function (client, callback) {
        var plainClient = ko.toJS (client.data);
        $.ajax({
            url: "/clients/" + client.data.id(),
            type: "PUT",
            data: JSON.stringify(plainClient),
            contentType: "application/json",
            success: function(result) {
                callback (client);
            }
        });
    };

    // Send DELETE Request for Deletting a Client
    var deleteClient = function (client, callback) {
        $.ajax({
            url: "/clients/" + client.data.id(),
            type: "DELETE",
            success: function(result) {
                callback (client);
            }
        });
    };

    // Send GET Request for Geting All Clients
    var getClients = function (callback) {
        $.ajax({
            url: "/clients",
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    };

    // Send GET Request for Getting  Client features
    var getClientFeatures = function (clientId, callback) {
        $.ajax({
            url: "/clientFeatures/" + clientId,
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    };

    // Send GET Request for Get Client and product area features
    var getClientProductFeatures = function (clientId, productId, callback) {
        $.ajax({
            url: "/clientProductFeatures/" + clientId +'/' + productId,
            type: "GET",
            success: function (result) {
                callback (result);
            }
        });
    };


    

    return {
        addClient,
        getClients,
        deleteClient,
        updateClient,
        getClientFeatures,
        getClientProductFeatures
    };
}();