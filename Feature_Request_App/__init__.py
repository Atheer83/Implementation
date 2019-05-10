import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

# DATABASE SETUP
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://britecore:britecore@localhost:5432/requests' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
Migrate(app,db)

from Feature_Request_App.features.views import features
from Feature_Request_App.clients.views import clients
from Feature_Request_App.products.views import products

app.register_blueprint(features)
app.register_blueprint(clients)
app.register_blueprint(products)

