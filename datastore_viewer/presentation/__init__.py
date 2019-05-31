import flask

from datastore_viewer.presentation import ui

blueprint = flask.Blueprint('datastore-viewer', __name__, template_folder='template')

ui.register_views(blueprint)
