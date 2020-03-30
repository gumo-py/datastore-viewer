FROM python:3.7.2-stretch

RUN pip install datastore-viewer==0.2.0

ENTRYPOINT ["datastore-viewer"]
