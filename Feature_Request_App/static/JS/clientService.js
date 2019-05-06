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
                console.log("Clients", JSON.stringify(result));
                callback (result);
            }
        });
    };
    return {
        addClient: addClient,
        getClients: getClients,
        deleteClient: deleteClient,
        updateClient: updateClient,
    };
}();