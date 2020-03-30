import os
from logging import getLogger

import flask.views

logger = getLogger(__name__)


class DashboardView(flask.views.MethodView):
    def get(self, path=None):
        return flask.render_template('datastore_viewer/index.html')


class ServeStaticFileView(flask.views.MethodView):
    def get(self, path):
        directory = os.path.join(os.path.dirname(__file__), '..', 'template', 'datastore_viewer', 'static')
        logger.info(f'call ServeStaticFileView, {directory} {path}')
        return flask.send_from_directory(directory, path)
