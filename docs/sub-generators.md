> Sub-generators allow you to add a specific file or files to an existing project.

## yo assemble

This is the default generator. Running `yo assemble` will generate the following files to create a complete Assemble project:

* `docs/README.tmpl.md`: a readme template
* `.assemblerc.yml`: a runtime config file for Assemble
* `package.json`: with minimal properties defined. However, if this exists already `assemble` will be added to `devDependencies`.



## Config

### yo assemble:config

Add a basic `.assemblerc.yml` config file for Assemble with:

```bash
yo assemble:config
```

To add a config file that is geared towards usage with Grunt, run `yo assemble:config grunt`


## Templates

> Add a Handlebars template to your project, ready to use with Assemble.

### yo assemble:page

Add a page template to `templates/pages` with:

```bash
yo assemble:page foo
```

Where `foo` is the name of the file you want to add.

* `yo assemble:page about` results in `templates/pages/about.hbs`
* `yo assemble:page index` results in `templates/pages/index.hbs`
* `yo assemble:page foo/bar` results in `templates/pages/foo/bar.hbs`


### yo assemble:layout

Add a layout template to `templates/layouts` with:

```bash
yo assemble:layout foo
```

Where `foo` is the name of the file you want to add.

* `yo assemble:layout default` results in `templates/layouts/default.hbs`
* `yo assemble:layout base` results in `templates/layouts/base.hbs`


### yo assemble:include

Add a include template to `templates/includes` with:

```bash
yo assemble:include foo
```

Where `foo` is the name of the file you want to add.

* `yo assemble:include nav` results in `templates/includes/nav.hbs`
* `yo assemble:include button` results in `templates/includes/button.hbs`



### yo assemble:data

Assemble processes templates using data from your project's package.json. You can extend the data available to your
templates with any JSON or YAML files specified in `.assemblerc.yml` or in `options.data`.

Add a data file to your project with:

* `yo assemble:data changelog`: adds a `CHANGELOG` file to the root of your project, formatted as valid YAML.



### yo assemble:doc

Add a starter markdown file for general content to `content/` with:

```bash
yo assemble:doc foo.md
```

Where `foo.md` is the name of the file you want to add.



### yo assemble:post

Add a starter markdown file for a blog post to `content/posts/` with:

```bash
yo assemble:post foo.md
```
Where `foo` is the name of the blog post you want to add. Blog posts also include basic YAML front matter.



### yo assemble:helper

Add a starter Handlebars helper to `templates/_helpers` with:

```bash
yo assemble:helper foo
```

Where `foo` is the name of the file you want to add.

* `yo assemble:helper slugify` results in `templates/_helpers/slugify.js`
* `yo assemble:helper eachIndex` results in `templates/_helpers/eachIndex.js`



### yo assemble:plugin

Add a starter Assemble plugin to `templates/_plugins` with:

```bash
yo assemble:plugin foo
```

Where `foo` is the name of the file you want to add.

* `yo assemble:plugin navigation` results in `templates/_plugins/navigation.js`
* `yo assemble:plugin breadcrumbs` results in `templates/_plugins/breadcrumbs.js`



### yo assemble:component

Add a UI component consisting of:

* template
* stylesheet
* data file (yaml/json)


```bash
yo assemble:doc foo.md
```

Where `foo.md` is the name of the file you want to add. If the name used matches an actual file in [assemble-readme-includes](https://github.com/assemble/assemble-readme-includes), then that file will be copied into the `docs/` directory of your project.

If the name _doesn't match_ a valid file in [upstage-components](https://github.com/upstage/upstage-components), then a new "starter" document will be created using the given file name.



### yo assemble:boilerplate

Use a boilerplate to kickstart documentation for a project. Boilerplates include a `README.tmpl.md` template and a few includes, such as `install.md`, `options.md` etc.

```bash
yo assemble:boilerplate foo
```

Where `foo` is the name of the boilerplate you want to use from [assemble-boilerplates](https://github.com/assemble/assemble-boilerplates).

Valid `yo assemble:boilerplate` arguments are:

_(TODO)_

**Pro tip**: you can use the default boilerplate, `node`, by running just `yo assemble:boilerplate`.



### Custom boilerplates

Visit the docs for [adding custom boilerplates](./docs/custom-boilerplates.md).




## Misc

### yo assemble:remote

Adds files from the specified GitHub repository.

Usage:

```bash
yo assemble:remote foo
```

There are only two options here:

1. Use `yo assemble:remote helpers` to get docs from the [handlebars-helpers](https://github.com/assemble/handlebars-helpers) repo, and write them to `docs/helpers`.
2. Use this format: `yo assemble:remote username/repo some/directory` to get files from the specified repo and directory.

