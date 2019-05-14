from flask import  jsonify, Blueprint,request
from Feature_Request_App import db
from Feature_Request_App.models import Products, products_schema, product_schema
import json


products = Blueprint('products',__name__)

#Get all products
@products.route('/products',methods=['GET'])
def get_products():
     all_products = Products.query.all()
     result = products_schema.dump(all_products)
     return jsonify(result.data)

# Add NewProduct
@products.route('/products',methods=['POST'])
def add_product():
     name=request.json['name']
     product = Products(name)
     db.session.add(product)
     db.session.commit()
     return product_schema.jsonify(product)

# Delete a product
@products.route('/products/<id>', methods=['DELETE'])
def delete_product(id):
     product = Products.query.get(id)
     db.session.delete(product)
     db.session.commit()
     return product_schema.jsonify(product)

# Update a product
@products.route('/products/<id>', methods=['PUT'])
def update_product(id):
  product = Products.query.get(id)
  name = request.json['name']
  product.name = name
  db.session.commit()
  return product_schema.jsonify(product)

     
    
    
