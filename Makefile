uname_S := $(shell uname -s)

.PHONY: build

all: build fe-start

build: be-install fe-install

be-install:
	cd backend && npm install

be-deploy:
	cd backend && npm run deploy

be-remove: be-install
	cd backend && npm run remove

fe-start:
	cd frontend && npm start

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

deploy: be-deploy fe-deploy
