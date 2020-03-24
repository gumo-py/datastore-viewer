package_name = datastore-viewer

export PATH := venv/bin:$(shell echo ${PATH})

.PHONY: run
run:
	PYTHONPATH=. python datastore_viewer/__init__.py

.PHONY: release
release: clean build
	python -m twine upload \
		--repository-url https://upload.pypi.org/legacy/ \
		dist/*

.PHONY: test_release
test_release: clean build
	python -m twine upload \
		--repository-url https://test.pypi.org/legacy/ \
		dist/*

.PHONY: test_install
test_install:
	pip --no-cache-dir install --upgrade \
		-i https://test.pypi.org/simple/ \
		${package_name}

.PHONY: webapp-build
webapp-build:
	docker-compose run --rm --no-deps webapp yarn run build

.PHONY: build
build: webapp-build
	python setup.py sdist bdist_wheel

.PHONY: clean
clean:
	rm -rf $(subst -,_,${package_name}).egg-info dist build

.PHONY: pip_compile
pip_compile:
	pip-compile \
		--output-file requirements.txt \
		requirements.in
	pip3 install --ignore-installed -r requirements.txt

.PHONY: docker-build-develop
docker-build-develop:
	docker build . --file=Dockerfile.develop -t quay.io/gumo/datastore-viewer:develop
	docker push quay.io/gumo/datastore-viewer:develop
