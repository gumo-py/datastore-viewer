import flask

from datastore_viewer.presentation import ui

blueprint = flask.Blueprint('datastore-viewer', __name__)

ui.register_views(blueprint)
