from flask import  jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import Clients, clients_schema, client_schema
import json


clients = Blueprint('clients',__name__)

#Get all clients
@clients.route('/clients',methods=['GET'])
def get_clients():
     all_clients = Clients.query.all()
     result = clients_schema.dump(all_clients)
     return jsonify(result.data)

@clients.route('/clients',methods=['POST'])
def add_client():
     name=request.json['name']

     client = Clients(name)

     db.session.add(client)
     db.session.commit()
     return client_schema.jsonify(client)

# Delete a client
@clients.route('/clients/<id>', methods=['DELETE'])
def delete_client(id):
     client = Clients.query.get(id)
     db.session.delete(client)
     db.session.commit()

     return client_schema.jsonify(client)

# Update a client
@clients.route('/clients/<id>', methods=['PUT'])
def update_client(id):
  client = Clients.query.get(id)

  name = request.json['name']

  client.name = name

  db.session.commit()

  return client_schema.jsonify(client)

     
    
    
