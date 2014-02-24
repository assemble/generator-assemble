# Assemble generator [![Build Status](https://travis-ci.org/assemble/generator-assemble.png)](https://travis-ci.org/assemble/generator-assemble)

> [Yeoman][yeoman] generator for [Assemble][assemble].

## Getting started

Install the generator from [npm](npmjs.org):

``` bash
npm i -g generator-assemble
```

## Usage

Generate a new Assemble project:

```bash
yo assemble
```

#### Generator options

* `-i` alias `--init`

  Force to prompt question and re-initialize `.yo-rc.json`.

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.


## Included Grunt tasks

* grunt-contrib-clean
* grunt-contrib-connect
* grunt-contrib-watch
* time-grunt


## Boilerplate

The following directory structure is generated after running `yo assemble`:

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
    │   └── assets
    │       ├── css
    │       │   ├── bootstrap.css
    │       │   ├── bootstrap.min.css
    │       │   └── theme.css
    │       ├── js
    │       │   └── bootstrap.min.js
    │       └── fonts
    │           ├── glyphicons-halflings-regular.eot
    │           ├── glyphicons-halflings-regular.svg
    │           ├── glyphicons-halflings-regular.ttf
    │           └── glyphicons-halflings-regular.woff
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


## Related

 * [Assemble Helper generator](https://github.com/assemble/generator-helper)
 * [Assemble Plugin generator](https://github.com/assemble/generator-plugin)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/
[assemble]: http://assemble.io
