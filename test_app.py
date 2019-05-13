import os
import unittest
from Feature_Request_App import db, create_app
from Feature_Request_App.models import FeatureRequest, Clients, Products
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.dirname(__file__)) 

class TestClient(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = Clients(name='Client A')
        self.productarea = Products(name='Policies')
        self.feature = FeatureRequest(
            title='Title Test',
            description='Description',
            target_date=datetime.strptime('2018-11-13', '%Y-%m-%d'),
            client_priority=1,
            product_area_id=1,
            client_id=1
        )
        
        db.create_all()
        #test getdata before we add requests
        resp = self.app_client.get('/features')
        self.assertEqual(200, resp.status_code)
        db.session.add(self.client)
        db.session.add(self.productarea)
        db.session.add(self.feature)
        # self.feature = db.session.query.all().first()

    def tearDown(self):
        db.session.close()
        db.drop_all()
        self.app_context.pop()

#test routes
    #test root status code
    def test_root_Route(self):
        resp = self.app_client.get('/')
        self.assertEqual(200, resp.status_code)

    #test getdData route status code 
    def test_getData_Route(self):
        resp = self.app_client.get('/features')
        self.assertEqual(200, resp.status_code)

#test request route status code 
    def test_request_Route(self):
        resp = self.app_client.get('/features')
        self.assertEqual(200, resp.status_code)

# #test delete route
#     def test_delete_request(self):
#         resp = self.app_client.delete(f"/features/{self.feature.id}")
#         self.assertEqual(200, resp.status_code)
        

if __name__ == '__main__':
    unittest.main()
