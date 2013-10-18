# Assemble generator [![Build Status](https://travis-ci.org/assemble/generator-assemble.png)](https://travis-ci.org/assemble/generator-assemble)

> [Yeoman][yeoman] generator for [Assemble][assemble].

## Getting started
- Install the generator:
    `npm install -g generator-assemble`


## Usage

### Scaffolds out a new Assemble Boilerplate application.

```bash
mkdir project && cd project
yo assemble [--skip-install]
```

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

### Generate Plugin

```bash
yo assemble:plugin
```

If needed, you can specify a name and location too:

```bash
yo assemble:plugin <name> <path>`
```

## Alternative

 * [grunt-init-assemble](https://github.com/assemble/grunt-init-assemble)


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/
[assemble]: http://assemble.io
