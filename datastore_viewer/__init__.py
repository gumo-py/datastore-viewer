import os
import flask
import logging
import sys

from typing import Optional

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger(__name__)


class DatastoreViewer:
    FALLBACK_GOOGLE_APPLICATION_CREDENTIALS = os.path.join(
        os.path.dirname(__file__),
        'dummy-service-account-credential.json'
    )

    def __init__(
            self,
            emulator_host: Optional[str] = None,
    ):
        if emulator_host is not None:
            os.environ['DATASTORE_EMULATOR_HOST'] = emulator_host

        if os.environ.get('DATASTORE_EMULATOR_HOST', '') == '':
            raise RuntimeError(f'Environment variable "DATASTORE_EMULATOR_HOST" is required.')

        if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = self.FALLBACK_GOOGLE_APPLICATION_CREDENTIALS
            logger.info('Environment variable "GOOGLE_APPLICATION_CREDENTIALS" is configured by fallback credentials.')

        self._emulator_host = os.environ['DATASTORE_EMULATOR_HOST']

        self._app = self._app_init()
        self._app_load()

    def _app_init(self):
        app = flask.Flask(__name__)
        app.config['JSON_AS_ASCII'] = False

        return app

    def _app_load(self):
        from datastore_viewer.presentation import blueprint

        self._app.register_blueprint(blueprint)

    def run(
            self,
            host: Optional[str] = None,
            port: Optional[str] = None,
            debug: Optional[bool] = None,
    ):
        logger.info(f'DatastoreViewer execute with DATASTORE_EMULATOR_HOST = {self._emulator_host}')
        return self._app.run(
            host=host,
            port=port,
            debug=debug,
        )


if __name__ == '__main__':
    DatastoreViewer().run(host='0.0.0.0', port='48080', debug=True)
