from flask import render_template as render, jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import FeatureRequest, feature_schema, features_schema, Clients, clients_schema, Products,products_schema
from datetime import datetime
import json


features = Blueprint('feature_requests',__name__)


@features.route('/')
def home():
     return render("index.html")


#Get all features
@features.route('/features',methods=['GET'])
def get_features():
     all_features = FeatureRequest.query.all()
     all_clients = Clients.query.all()
     all_products = Products.query.all()
     features_result = features_schema.dump(all_features)
     clients_result = clients_schema.dump(all_clients)
     products_result = products_schema.dump(all_products)
     for i in range(len(features_result.data)):
          client_id = features_result.data[i]['client_id']
          product_id = features_result.data[i]['product_area_id']
          client_name = clients_result.data[client_id - 1]['name']
          product_name = products_result.data[product_id - 1]['name']
          features_result.data[i]['client_id'] = client_name
          features_result.data[i]['product_area_id'] = product_name          
     return jsonify(features_result.data)

@features.route('/features',methods=['POST'])
def add_feature():
     # data = request.get_json()
     title=request.json['title']
     description=request.json['description']
     target=request.json['target_date']
     target_date=datetime.strptime(target, '%Y-%m-%d')
     client_priority=request.json['client_priority']
     client_id=request.json['client_id']
     product_area_id=request.json['product_area_id']

     feature_req = FeatureRequest(title, description,target_date, client_priority,client_id, product_area_id)

     db.session.add(feature_req)
     db.session.commit()
     print(feature_schema.jsonify(feature_req))
     return feature_schema.jsonify(feature_req)

# Delete a Feature
@features.route('/features/<id>', methods=['DELETE'])
def delete_feature(id):
     feature = FeatureRequest.query.get(id)
     db.session.delete(feature)
     db.session.commit()

     return feature_schema.jsonify(feature)

# Update a Feature
@features.route('/features/<id>', methods=['PUT'])
def update_feature(id):
  feature = FeatureRequest.query.get(id)

  title = request.json['title']
  description=request.json['description']
  target=request.json['target_date']
  target_date=datetime.strptime(target, '%Y-%m-%d')
  client_priority=request.json['client_priority']
  client_id=request.json['client_id']
  product_area_id=request.json['product_area_id']

  feature.title = title
  feature.description = description
  feature.target_date = target_date
  feature.client_priority = client_priority
  feature.client_id = client_id
  feature.product_area_id = product_area_id


  db.session.commit()

  return feature_schema.jsonify(feature)

     
    
    
