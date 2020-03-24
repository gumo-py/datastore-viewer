from logging import getLogger

import flask.views

logger = getLogger(__name__)


class DashboardView(flask.views.MethodView):
    def get(self):
        return flask.render_template('index.html')
