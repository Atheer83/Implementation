from flask import jsonify, Blueprint


features = Blueprint('feature_requests',__name__)

#Get all features
@features.route('/features')
def get():
    return jsonify([{
            'title': 'Feature 1',
            'description': 'add something to my software',
            'client': 'ClientA',
            'client_priority': 1,
            'target_date': 'May 4, 2019',
            'product_area': 'Reports',
            },{
            'title': 'Feature 2',
            'description': 'add something to my software',
            'client': 'ClientA',
            'client_priority': 2,
            'target_date': 'May 5, 2019',
            'product_area': 'Reports',
            }])