# Erasure

An erasure book simulation using public domain works from [Project Gutenberg](https://www.gutenberg.org/).

## Building locally

1. `cd path/to/repo`
2. `npm install` to install dev dependencies
3. `bower install` to install runtime dependencies
4. `grunt watch` to rebuild on file change (compatible with live-reload extensions)
5. Make changes
6. `grunt release` to make production minified/uglified build
7. Commit

## Adding a book

1. Create new `.txt` file in `books/` via the "Plain Text UTF-8" option in Project Gutenberg
2. Update `books/Books.js` with the title and filename of the book
