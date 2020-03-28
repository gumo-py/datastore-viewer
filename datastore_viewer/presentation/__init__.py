import flask

from datastore_viewer.presentation import ui

blueprint = flask.Blueprint(
    'datastore-viewer',
    __name__,
    template_folder='template',
    # static_folder='template/static'
)

ui.register_views(blueprint)
