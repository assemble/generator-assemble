# [{{ pkg.name }} v{{ pkg.version }}]({{ pkg.homepage }}){{#if readme.travis}} [![Build Status](https://travis-ci.org/{{ readme.username }}/{{ pkg.name }}.png)](https://travis-ci.org/{{ readme.username }}/{{ pkg.name }}){{/if}}

> {{{ pkg.description }}}

See more [assemble examples][assemble-examples].

## Getting started
{{> getting-started.md }}

## The "assemble" task
{{> documentation.md }}

## Contributing
{{> contributing.md }}

## Authors
{{ authors }}

## Release History
{{ changelog }}

## Roadmap
{{ roadmap }}

---

{{> footer.md }}