#!/bin/zsh

cd ts-node-tsc && \
# First just log the resolved config (doesn't build)
pnpm tsc --showConfig && \
# Then actually build
pnpm tsc && \
node ./app.js