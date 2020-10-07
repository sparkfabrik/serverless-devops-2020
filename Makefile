uname_S := $(shell uname -s)

.PHONY: build

all: build

build: fe-install

fe-install:
	cd frontend && npm install

fe-lint: fe-install
	cd frontend && npm run lint

fe-unit-test: fe-install
	cd frontend && npm run test

fe-deploy: fe-install
	cd frontend && npm run deploy

fe-remove: fe-install
	cd frontend && npm run remove

deploy: fe-deploy