from Feature_Request_App import db
from Feature_Request_App import ma
from datetime import datetime


class Clients(db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
   
    def __init__(self,name):
        self.name = name

class ClientsSchema(ma.Schema):
    class Meta:
        fields = ('id','name')

client_schema = ClientsSchema(strict=True)
clients_schema = ClientsSchema(many=True,strict=True)

class Products(db.Model):

    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
   
    def __init__(self,name):
        self.name = name

class ProductsSchema(ma.Schema):
    class Meta:
        fields = ('id','name')

product_schema = ProductsSchema(strict=True)
products_schema = ProductsSchema(many=True,strict=True)


class FeatureRequest(db.Model):

    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(2000), default='')
    client = db.Column(db.String(64), nullable=False)
    target_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    product_area = db.Column(db.String(64), nullable=False)
    client_priority = db.Column(db.Integer, nullable=False)

    def __init__(self,title,description,client,target_date,product_area,client_priority):
        self.title = title
        self.description = description
        self.client = client
        self.target_date =  target_date
        self.product_area = product_area
        self.client_priority = client_priority

class FeatureRequestSchema(ma.Schema):
    class Meta:
        fields = ('id','title','description','client','target_date','product_area','client_priority')

feature_schema = FeatureRequestSchema(strict=True)
features_schema = FeatureRequestSchema(many=True,strict=True)



db.drop_all()
db.create_all()
        