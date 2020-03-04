# datastore-viewer

datastore-viewer is a simple viewer of Google Cloud Datastore Emulator.

## Quickstart using docker-compose

A example of docker-compose.yml:

```yaml
version: "3"

services:
  datastore_emulator:
    image: quay.io/gumo/datastore-emulator
    environment:
      DATASTORE_PROJECT_ID: test-project
      DATASTORE_LISTEN_ADDRESS: 0.0.0.0:8081
    ports:
      - "8081:8081"
    volumes:
      - datastore-emulator-storage:/opt/data
    # command: start-datastore --no-store-on-disk --consistency=1.0

  datastore_viewer:
    image: quay.io/gumo/datastore-viewer
    environment:
      DATASTORE_VIEWER_HOST: 0.0.0.0
      DATASTORE_VIEWER_PORT: 18081
      GOOGLE_CLOUD_PROJECT: test-project
      DATASTORE_EMULATOR_HOST: datastore_emulator:8081
    depends_on:
      - datastore_emulator
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

## for Developers

### Setup

Create new venv:

```bash
$ python -m venv venv
$ source venv/bin/activate
```

Upgrade pip and install building tools:

```bash
$ pip install --upgrade pip
$ pip install twine wheel pytest pip-tools
```

Install dependency packages:

```bash
$ pip install -r requirements.txt
```

### Run

```bash
$ export DATASTORE_EMULATOR_HOST=127.0.0.1:8081
$ make run
```

### Package Build

```bash
$ make build
```
