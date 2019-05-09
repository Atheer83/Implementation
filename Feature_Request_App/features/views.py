from flask import render_template as render, jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import FeatureRequest, feature_schema, features_schema, Clients, clients_schema, Products,products_schema
from datetime import datetime
import json


features = Blueprint('feature_requests',__name__)


@features.route('/')
def home():
     return render("index.html")

#Get client features 
@features.route('/clientFeatures/<id>',methods=['GET'])
def get_client_features(id):
     client_features = FeatureRequest.query.filter_by(client_id=id)
     all_clients = Clients.query.all()
     all_products = Products.query.all()
     features_result = features_schema.dump(client_features)
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

#Get product area features 
@features.route('/productFeatures/<id>',methods=['GET'])
def get_product_features(id):
     product_features = FeatureRequest.query.filter_by(product_area_id=id)
     all_clients = Clients.query.all()
     all_products = Products.query.all()
     features_result = features_schema.dump(product_features)
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

#Get client product area features 
@features.route('/clientProductFeatures/<clientId>/<productId>',methods=['GET'])
def get_client_product_features(clientId,productId):
     client_product_features = FeatureRequest.query.filter_by(client_id=clientId,product_area_id=productId)
     all_clients = Clients.query.all()
     all_products = Products.query.all()
     features_result = features_schema.dump(client_product_features)
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

# Add new feature
@features.route('/features',methods=['POST'])
def add_feature():
     client_priority=request.json['client_priority']
     client_id=request.json['client_id']
     client_features = FeatureRequest.query.filter_by(client_id=client_id).order_by('client_priority')
     features_result = features_schema.dump(client_features)
     if features_result.data:
          print(type (client_priority), type (features_result.data[0]['client_priority']))
          new_priority = 0
          for i in range(len(features_result.data)):
               if client_priority == str (features_result.data[i]['client_priority']):
                    new_priority = features_result.data[i]['client_priority']
                    break
          if new_priority > 0:
               for i in range(len(features_result.data)):
                    current_priority = features_result.data[i]['client_priority']
                    if current_priority >= (new_priority):
                         id = features_result.data[i]['id']
                         update_feature_priority(id)
                         if (i+1) < len(features_result.data):
                              if current_priority + 1 < features_result.data[i + 1]['client_priority']:
                                   break

          
     title=request.json['title']
     description=request.json['description']
     target=request.json['target_date']
     target_date=datetime.strptime(target, '%Y-%m-%d')
     client_id=request.json['client_id']
     product_area_id=request.json['product_area_id']

     feature_req = FeatureRequest(title, description,target_date, client_priority,client_id, product_area_id)

     db.session.add(feature_req)
     db.session.commit()
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
     client_priority=request.json['client_priority']
     client_id=request.json['client_id']
     client_features = FeatureRequest.query.filter_by(client_id=client_id).order_by('client_priority')
     features_result = features_schema.dump(client_features)
     print(feature.client_id,client_id)
     new_priority = 0
     if features_result.data:
          if client_id != feature.client_id:
               for i in range(len(features_result.data)):
                    if client_priority == features_result.data[i]['client_priority']:
                         new_priority=client_priority
                         break
               for i in range(len(features_result.data)):
                    current_priority = features_result.data[i]['client_priority']
                    if current_priority >= int(new_priority):
                         id = features_result.data[i]['id']
                         update_feature_priority(id)
                         if (i+1) < len(features_result.data):
                              if current_priority + 1 < features_result.data[i + 1]['client_priority']:
                                   break
          elif client_id == feature.client_id:
               if int(client_priority) > feature.client_priority:
                    print("new > old")
                    for i in range(len(features_result.data)):
                         if int(client_priority) == features_result.data[i]['client_priority']:
                              new_priority=int(client_priority)
                              print(new_priority, "new_priority")
                              break
                    for i in range(len(features_result.data)):
                         current_priority = features_result.data[i]['client_priority']
                         print(current_priority, " current_priority")
                         if current_priority >= new_priority:
                              id = features_result.data[i]['id']
                              update_feature_priority(id)
                              if (i+1) < len(features_result.data):
                                   if current_priority + 1 < features_result.data[i + 1]['client_priority']:
                                        break

               elif int(client_priority) < feature.client_priority:
                    print("new < old")
                    for i in range(len(features_result.data)):
                         if int(client_priority) == features_result.data[i]['client_priority']:
                              new_priority=int(client_priority)
                              print(new_priority, "new_priority")
                              break
                    for i in range(len(features_result.data)):
                         current_priority = features_result.data[i]['client_priority']
                         print(current_priority, " current_priority")
                         if current_priority == feature.client_priority:
                              print(feature.client_priority, "old")
                              break 
                         if current_priority >= new_priority:
                              id = features_result.data[i]['id']
                              update_feature_priority(id)
                              if (i+1) < len(features_result.data):
                                   if current_priority + 1 < features_result.data[i + 1]['client_priority']:
                                        break
                 
     title = request.json['title']
     description=request.json['description']
     target=request.json['target_date']
     target_date=datetime.strptime(target, '%Y-%m-%d')
     product_area_id=request.json['product_area_id']

     feature.title = title
     feature.description = description
     feature.target_date = target_date
     feature.client_priority = client_priority
     feature.client_id = client_id
     feature.product_area_id = product_area_id


     db.session.commit()

     return feature_schema.jsonify(feature)

def update_feature_priority(id):
     feature = FeatureRequest.query.get(id)
     feature.client_priority = feature.client_priority + 1
     db.session.commit()
     
# def replace_feature_priority(id,new_priority):
#      feature = FeatureRequest.query.get(id)
#      feature.client_priority = new_priority
#      db.session.commit()
    
