from logging import getLogger

import flask.views

logger = getLogger(__name__)


class DashboardView(flask.views.MethodView):
    def get(self, path=None):
        return flask.render_template('index.html')
