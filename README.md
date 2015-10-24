# diffsync-todos


## Changes to original
Rewrote in TypeScript, begun by:

    find -type f -name '*.js' -exec bash -c 'mv "${1}" "${1%???}.ts"' bash {} \;

Then modified each file, adding to tsd.json, tsconfig.json, and cust_typings as I went, until the compilation succeeded.
