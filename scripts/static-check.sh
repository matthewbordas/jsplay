#!/bin/zsh

pnpm static:format:check && \
pnpm static:lint:check && \
pnpm static:types:check