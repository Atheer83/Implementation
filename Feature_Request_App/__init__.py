from flask import Flask

app = Flask(__name__)

from Feature_Request_App.features.views import features

app.register_blueprint(features)