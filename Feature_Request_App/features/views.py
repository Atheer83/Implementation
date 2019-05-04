from flask import render_template as render, jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import FeatureRequest, feature_schema, features_schema
import json


features = Blueprint('feature_requests',__name__)


@features.route('/')
def home():
     return render("index.html")


#Get all features
@features.route('/features',methods=['GET'])
def get_features():
     all_features = FeatureRequest.query.all()
     result = features_schema.dump(all_features)
     return jsonify(result.data)

@features.route('/features',methods=['POST'])
def add_feature():
     # data = request.get_json()
     title=request.json['title']
     description=request.json['description']
     client=request.json['client']
     # target_date=request.json['target_date']
     # client_priority=request.json['client_priority']
     product_area=request.json['product_area']

     feature_req = FeatureRequest(title, description, client, product_area)

     db.session.add(feature_req)
     db.session.commit()
     print(feature_schema.jsonify(feature_req))
     return feature_schema.jsonify(feature_req)

# Delete a Feature
@features.route('/features/<id>', methods=['DELETE'])
def delete_feture(id):
     feture = FeatureRequest.query.get(id)
     db.session.delete(feture)
     db.session.commit()

     return feture_schema.jsonify(feture)

# Update a Feature
@features.route('/features/<id>', methods=['PUT'])
def update_feture(id):
  feture = FeatureRequest.query.get(id)

  title = request.json['title']
  description=request.json['description']
  client=request.json['client']
  # target_date=request.json['target_date']
  # client_priority=request.json['client_priority']
  product_area=request.json['product_area']

  feture.title = title
  feture.description = description
  feture.client = client
#   feture.target_date = target_date
#   feture.client_priority = client_priority
  feture.product_area = product_area


  db.session.commit()

  return feture_schema.jsonify(feture)

     
    
    
