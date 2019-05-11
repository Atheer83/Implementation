from flask import render_template as render, jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import FeatureRequest, feature_schema, features_schema, Clients, clients_schema, Products,products_schema
from datetime import datetime
import json

features = Blueprint('feature_requests',__name__)

@features.route('/')
def home():
     return render("index.html")

#Get All Features for a Client 
@features.route('/clientFeatures/<id>',methods=['GET'])
def get_client_features(id):
     client_features = FeatureRequest.query.filter_by(client_id=id)
     features_result = features_schema.dump(client_features)
     return jsonify(features_result.data)

#Get All Features for a Product Area 
@features.route('/productFeatures/<id>',methods=['GET'])
def get_product_features(id):
     product_features = FeatureRequest.query.filter_by(product_area_id=id)
     features_result = features_schema.dump(product_features)   
     return jsonify(features_result.data)

#Get All Features has a spesific Client and Product Area 
@features.route('/clientProductFeatures/<clientId>/<productId>',methods=['GET'])
def get_client_product_features(clientId,productId):
     client_product_features = FeatureRequest.query.filter_by(client_id=clientId,product_area_id=productId)
     features_result = features_schema.dump(client_product_features)
     return jsonify(features_result.data)

#Get All Features
@features.route('/features',methods=['GET'])
def get_features():
     all_features = FeatureRequest.query.all()
     features_result = features_schema.dump(all_features)
     return jsonify(features_result.data)

# Add a New Feature
@features.route('/features',methods=['POST'])
def add_feature():
     client_priority=request.json['client_priority']
     client_id=request.json['client_id']
     title=request.json['title']
     description=request.json['description']
     target=request.json['target_date']
     target_date=datetime.strptime(target, '%Y-%m-%d')
     product_area_id=request.json['product_area_id']
     client_features = FeatureRequest.query.filter_by(client_id=client_id).order_by('client_priority')
     features_result = features_schema.dump(client_features)
     if features_result.data:
          adjust_priority(features_result,client_priority,0)

     feature_req = FeatureRequest(title, description,target_date, client_priority,client_id, product_area_id)
     db.session.add(feature_req)
     db.session.commit()
     return jsonify({'Success': 'Add Feature successfully'})

# Delete a Feature
@features.route('/features/<id>', methods=['DELETE'])
def delete_feature(id):
     feature = FeatureRequest.query.get(id)
     db.session.delete(feature)
     db.session.commit()
     return jsonify({'Success': 'Delete Feature successfully'})

# Update a Feature
@features.route('/features/<id>', methods=['PUT'])
def update_feature(id):
     feature = FeatureRequest.query.get(id)
     old_priority = feature.client_priority
     new_client_priority=request.json['client_priority']
     new_client_id=request.json['client_id']
     new_title = request.json['title']
     new_description=request.json['description']
     target=request.json['target_date']
     new_target_date=datetime.strptime(target, '%Y-%m-%d')
     new_product_area_id=request.json['product_area_id']
     client_features = FeatureRequest.query.filter_by(client_id=new_client_id).order_by('client_priority')
     features_result = features_schema.dump(client_features)

     if features_result.data:
          if new_client_id != feature.client_id:
               adjust_priority(features_result,new_client_priority,0)
          elif new_client_id == feature.client_id:
               if int(new_client_priority) > feature.client_priority:
                    adjust_priority(features_result,new_client_priority,0)
               elif int(new_client_priority) < feature.client_priority:
                    adjust_priority(features_result,new_client_priority,old_priority)
                 
     feature.title = new_title
     feature.description = new_description
     feature.target_date = new_target_date
     feature.client_priority = new_client_priority
     feature.client_id = new_client_id
     feature.product_area_id = new_product_area_id

     db.session.commit()
     return jsonify({'Success': 'Update Feature successfully'})

# Rebuild Database
@features.route('/rebuildDatabase', methods=['GET'])
def rebuild_database():
     db.drop_all()
     db.create_all()
     clientA = Clients('ClientA')
     clientB = Clients('ClientB')
     clientC = Clients('ClientC')
     area1=Products('Policies')
     area2=Products('Billings')
     area3=Products('Claims')
     area4=Products('Reports')
     db.session.add(clientA)
     db.session.add(clientB)
     db.session.add(clientC)
     db.session.add(area1)
     db.session.add(area2)
     db.session.add(area3)
     db.session.add(area4)
     db.session.commit()
     return jsonify({'Success': 'Rebuild Database successfully'})

        

#Change Priority when add or update
def adjust_priority(features_result,new_client_priority,old_priority):
      for i in range(len(features_result.data)):
               if int(new_client_priority) == features_result.data[i]['client_priority']:
                    for i in range(len(features_result.data)):
                         current_priority = features_result.data[i]['client_priority']
                         if current_priority == old_priority:
                              break 
                         if current_priority >= int(new_client_priority):
                              id = features_result.data[i]['id']
                              feature = FeatureRequest.query.get(id)
                              feature.client_priority = feature.client_priority + 1
                              db.session.commit()
                              
                              if (i+1) < len(features_result.data):
                                   if current_priority + 1 < features_result.data[i + 1]['client_priority']:
                                        break
                    break

    
