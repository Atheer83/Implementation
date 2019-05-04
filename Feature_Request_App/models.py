from Feature_Request_App import db
from Feature_Request_App import ma
from datetime import datetime

class FeatureRequest(db.Model):

    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(2000), default='')
    client = db.Column(db.String(64), nullable=False)
    # target_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    product_area = db.Column(db.String(64), nullable=False)
    # client_priority = db.Column(db.Integer, nullable=False)

    def __init__(self,title,description,client,product_area):
        self.title = title
        self.description = description
        self.client = client
        # self.target_date = target_date
        # self.client_priority = client_priority
        self.product_area = product_area

class FeatureRequestSchema(ma.Schema):
    class Meta:
        fields = ('title','description','client','product_area')

feature_schema = FeatureRequestSchema(strict=True)
features_schema = FeatureRequestSchema(many=True,strict=True)


    # def features2dict(self, features):
    #     return {
    #         'title': features.title,
    #         'description': features.description,
    #         'client': features.client,
    #         'product_area': features.product_area,
    #     }

db.drop_all()
db.create_all()
        