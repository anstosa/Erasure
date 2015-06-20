# Erasure

An erasure book simulation using public domain works from [Project Gutenberg](https://www.gutenberg.org/).

## Installing global dependencies

1. nodejs and npm
2. `npm install -g http-server`

## Building locally

1. `git clone git@github.com:<USERNAME>/Erasure.git`
2. `http-server`
3. `cd Erasure`
4. `npm install` to install dev dependencies
5. `bower install` to install runtime dependencies
6. `grunt watch` to rebuild on file change (compatible with live-reload extensions)
7. Make changes
8. `grunt release` to make production minified/uglified build
9. Commit

## Adding a book

1. Create new `.txt` file in `books/` via the "Plain Text UTF-8" option in Project Gutenberg
2. Update `books/Books.js` with the title and filename of the book
