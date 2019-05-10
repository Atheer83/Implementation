var ClientService = function () {

    // Add Client
    var addClient = function (client, callback) {
        var plainClient = ko.toJS (client);
        console.log("Saving Client [" + JSON.stringify(plainClient) + "] ");
        $.ajax({
            url: "/clients",
            type: "POST",
            data: JSON.stringify(plainClient),
            contentType: "application/json",
            success: function(result) {
                console.log(JSON.stringify(result))
                callback (client);
            }
        });
    };

    // Update Client
    var updateClient = function (client, callback) {
        var plainClient = ko.toJS (client.data);
        console.log("Updating Client [" + JSON.stringify(plainClient) + "] ");
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

    // Delete Client
    var deleteClient = function (client, callback) {
        $.ajax({
            url: "/clients/" + client.data.id(),
            type: "DELETE",
            success: function(result) {
                console.log(result)
                callback (client);
            }
        });
    };

    // Get All Clients
    var getClients = function (callback) {
        $.ajax({
            url: "/clients",
            type: "GET",
            success: function (result) {
                // console.log("Clients", JSON.stringify(result));
                callback (result);
            }
        });
    };

    // Get  Client features
    var getClientFeatures = function (clientId, callback) {
        $.ajax({
            url: "/clientFeatures/" + clientId,
            type: "GET",
            success: function (result) {
                console.log("client features", JSON.stringify(result));
                callback (result);
            }
        });
    };

    // Get  Client and product area features
    var getClientProductFeatures = function (clientId, productId, callback) {
        $.ajax({
            url: "/clientProductFeatures/" + clientId +'/' + productId,
            type: "GET",
            success: function (result) {
                console.log("client product area features", JSON.stringify(result));
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