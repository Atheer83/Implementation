import unittest
from flask import json
from Feature_Request_App import db, create_app
from Feature_Request_App.models import FeatureRequest, Clients, Products
from datetime import datetime

class TestClient(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = Clients(name='ClientA')
        self.productarea = Products(name='Reports')
        self.feature = FeatureRequest(
            title='Title1',
            description='Description1',
            target_date=datetime.strptime('2019-05-13', '%Y-%m-%d'),
            client_priority=1,
            product_area_id=1,
            client_id=1
        )
        db.create_all()

#test get features before we add new feature
        resp = self.app_client.get('/features')
        self.assertEqual(200, resp.status_code)
        db.session.add(self.client)
        db.session.add(self.productarea)
        db.session.add(self.feature)
        self.client = db.session.query(Clients).first()
        self.productarea = db.session.query(Products).first()
        self.feature = db.session.query(FeatureRequest).first()

    def tearDown(self):
        db.session.close()
        db.drop_all()
        self.app_context.pop()

#test routes
#test root status code
    def test_root_Route(self):
        resp = self.app_client.get('/')
        self.assertEqual(200, resp.status_code)

#test get all features by client route status code 
    def test_client_features_Route(self):
        resp = self.app_client.get(f"/clientFeatures/{self.client.id}")
        self.assertEqual(200, resp.status_code)

#test get all features by product area route status code 
    def test_product_features_Route(self):
        resp = self.app_client.get(f"/productFeatures/{self.productarea.id}")
        self.assertEqual(200, resp.status_code)

#test get all features by a spesific client and product area route status code 
    def test_client_product_features_Route(self):
        resp = self.app_client.get(f"/clientProductFeatures/{self.client.id}/{self.productarea.id}")
        self.assertEqual(200, resp.status_code)

#test get all features route status code 
    def test_features_Route(self):
        resp = self.app_client.get('/features')
        self.assertEqual(200, resp.status_code)


#test delete feature route
    def test_delete_request(self):
        resp = self.app_client.delete(f"/features/{self.feature.id}")
        self.assertEqual(200, resp.status_code)

#test update feature, put request   
    def test_add_request(self):
        #add feature first
        request_data={"title":"title","description":"description1","client_id":1,"product_area_id":1,"client_priority":"1","target_date":"2019-05-13"}
        resp = self.app_client.post('/features',
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
	    data=json.dumps(request_data))

        #update the feature after adding it
        new_request_data={"title":"new title","description":"description2","client_id":1,"product_area_id":1,"client_priority":"3","target_date":"2019-05-16"}
        resp = self.app_client.put(f"/features/{self.feature.id}",
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
	    data=json.dumps(new_request_data))

        self.assertEqual(200, resp.status_code)
        

if __name__ == '__main__':
    unittest.main()
