# datastore-viewer

datastore-viewer is a simple viewer of Google Cloud Datastore Emulator.

## Installing

```bash
$ pip install --upgrade datastore-viewer
```

## Running

```bash
datastore-viewer
```

or

```bash
export DATASTORE_VIEWER_HOST=127.0.0.1
export DATASTORE_VIEWER_PORT=8082
datastore-viewer
```

## Running with docker-compose

A example of docker-compose.yml:

```yaml
version: '3'
services:
  datastore_emulator:
    image: singularities/datastore-emulator
    volumes:
      - datastore-emulator-storage:/opt/data
    environment:
      DATASTORE_PROJECT_ID: sample-project-id
      DATASTORE_LISTEN_ADDRESS: 0.0.0.0:8081
    ports:
      - "8081:8081"

  datastore_viewer:
    image: python:3.7.2-stretch
    environment:
      DATASTORE_VIEWER_HOST: 0.0.0.0
      DATASTORE_VIEWER_PORT: 18081
      DATASTORE_EMULATOR_HOST: datastore_emulator:8081
    command: |
      bash -ex -c "
      pip install --upgrade datastore-viewer
      datastore-viewer
      "
    ports:
      - "18081:18081"

volumes:
  datastore-emulator-storage:
    driver: local
```

Execute docker containers:

```bash
docker-compose up
```

Please access to: [http://127.0.0.1:18081](http://127.0.0.1:18081)
