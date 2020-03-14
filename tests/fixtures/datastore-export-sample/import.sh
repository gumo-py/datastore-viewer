#!/bin/bash

set -ex

curl -X POST \
  "${DATASTORE_EMULATOR_HOST}/v1/projects/${GOOGLE_CLOUD_PROJECT}:import" \
  -H "Content-Type: application/json" \
  -d '{"input_url": "/app/tests/fixtures/datastore-export-sample/export-20200314.overall_export_metadata"}'
