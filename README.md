# Assemble generator [![Build Status](https://travis-ci.org/assemble/generator-assemble.png)](https://travis-ci.org/assemble/generator-assemble)

> [Yeoman][yeoman] generator for [Assemble][assemble].

## Getting started
- Install the generator:
    `npm install -g generator-assemble`


## Usage

Creates an Assemble boilerplate projects.

```bash
mkdir project && cd $_
yo assemble
```

#### Options

* `-i` alias `--init`

  Force to prompt question and re-initialize `.yo-rc.json`.

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.

## Boilerplate
The following directory structure do you get after run `yo assemble`:

    .
    ├── .editorconfig
    ├── .gitignore
    ├── .yo-rc.json
    ├── AUTHORS
    ├── CHANGELOG
    ├── Gruntfile.js
    ├── LICENSE-MIT
    ├── package.json
    ├── README.md
    ├── dist
    │   ├── assets
    │   │   ├── assemble.css
    │   │   ├── github.css
    │   │   └── highlight.js
    ├── src
    │   ├── content
    │   │   └── markdown.md
    │   ├── data
    │   │   └── site.yml
    │   └── templates
    │       ├── layouts
    │       │   └── default.md
    │       ├── pages
    │       │   ├── index.hbs
    │       │   └── blog.hbs
    │       └── partials
    │           └── navbar-fixed-top.hbs
    └── node_modules

## Alternative

 * [grunt-init-assemble](https://github.com/assemble/grunt-init-assemble)


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/
[assemble]: http://assemble.io
