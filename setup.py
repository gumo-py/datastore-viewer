import setuptools
import os

name = 'datastore-viewer'
version = '0.2.0b1'
description = 'Datastore Viewer for emulator'
dependencies = [
    'google-cloud-datastore >=1.7.0, >= 1.8.0',
    'Flask >= 1.0.2',
    'flasgger >= 0.9.1',
]

with open("README.md", "r") as fh:
    long_description = fh.read()

packages = [
    package for package in setuptools.find_packages()
    if package.startswith('datastore_viewer')
]

namespaces = ['datastore_viewer']

scripts = [
    os.path.join('bin', 'datastore-viewer')
]

setuptools.setup(
    name=name,
    version=version,
    author="Gumo Project Team",
    author_email="gumo-py@googlegroups.com",
    description=description,
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/gumo-py/datastore-viewer",
    packages=packages,
    namespaces=namespaces,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    scripts=scripts,
    install_requires=dependencies,
    include_package_data=True,
)
