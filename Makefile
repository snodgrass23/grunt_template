RUBY_SERIES=1.9
WORKSPACE=$(dir $(realpath $(lastword $(MAKEFILE_LIST))))
TEMP_DIR=${WORKSPACE}/tmp

NO_COLOR=\x1b[0m
OK_COLOR=\x1b[32;01m
ERROR_COLOR=\x1b[31;01m
WARN_COLOR=\x1b[33;01m

default: help

help:
	@echo "${OK_COLOR}= DESIGN STUDIO MAKE COMMANDS ======"
	@echo "${WARN_COLOR} make setup"
	@echo "${NO_COLOR} Install npm modules and bower components"
	@echo "${WARN_COLOR} make start"
	@echo "${NO_COLOR} Run local testing server"
	@echo "${WARN_COLOR} make build"
	@echo "${NO_COLOR} Run grunt build task"
	@echo "${WARN_COLOR} make todo"
	@echo "${NO_COLOR} List todos from all files"


setup:
	@npm install
	@bower install

test:
	@grunt test

jshint:
	@grunt jshint

build:
	@grunt build

deploy: build github-pages

github-pages:
	@git subtree push --prefix dist origin gh-pages

todo:
	@git grep -i -A 3 TODO

todo-count:
	@echo "There are `git grep -i todo | wc -l` todos left"

serve:
	@grunt server

start: serve

