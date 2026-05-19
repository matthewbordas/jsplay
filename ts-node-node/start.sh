#!/bin/zsh

cd ts-node-node && \
# First just log the resolved config (doesn't build)
pnpm tsc --showConfig && \
# Then type check
pnpm tsc && \
node ./app.ts