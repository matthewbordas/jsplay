#!/bin/bash

dirs=('ts-bundler-tsc' 'ts-node-tsc')

for dir in $dirs[@]; do
    num_js_files=$(find $dir/*.js | grep -c '')
    if [[ $num_js_files -gt 0 ]]; then
        echo "Cleaning $dir"
        rm -f $dir/*.js
    else
        echo "Not cleaning $dir"
    fi
done
