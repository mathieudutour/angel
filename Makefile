BIN=node_modules/.bin

build:
	$(BIN)/babel src --out-dir build && \
	$(BIN)/webpack build/app.js build/app.bundle.js -p

clean:
	rm -rf build

lint:
	$(BIN)/eslint

PHONY: build clean lint
