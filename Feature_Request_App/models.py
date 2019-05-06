from Feature_Request_App import db
from Feature_Request_App import ma
from datetime import datetime


class Clients(db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    features = db.relationship('FeatureRequest', backref='client', lazy=True)

   
    def __init__(self,name):
        self.name = name

    def __repr__(self):
        return '%s' % self.name

class ClientsSchema(ma.Schema):
    class Meta:
        fields = ('id','name')

client_schema = ClientsSchema(strict=True)
clients_schema = ClientsSchema(many=True,strict=True)

class Products(db.Model):

    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    features = db.relationship('FeatureRequest', backref='product_area', lazy=True)

   
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
    target_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    client_priority = db.Column(db.Integer, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    product_area_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    def __init__(self,title,description,target_date,client_priority,client_id,product_area_id):
        self.title = title
        self.description = description
        self.target_date =  target_date
        self.client_priority = client_priority
        self.client_id = client_id
        self.product_area_id = product_area_id

class FeatureRequestSchema(ma.Schema):
    class Meta:
        fields = ('id','title','description','target_date','client_priority', 'client_id','product_area_id')

feature_schema = FeatureRequestSchema(strict=True)
features_schema = FeatureRequestSchema(many=True,strict=True)



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
        