Once installed globally, simply run:

* `yo assemble` to to start a new project
* `yo assemble:boilerplate [foo]` to use a [specific boilerplate](https://github.com/assemble/assemble-boilerplates). Assemble boilerplates are just sets of documents.
* `yo assemble:doc [foo]` to add a [specific document](https://github.com/assemble/assemble-readme-includes) or 'include'.

### yo assemble

Running the generator with `yo assemble` will add the following files to your project:

* `docs/README.tmpl.md`: a readme template
* `.assemblerc.yml`: a runtime config file for Assemble
* `package.json`: with minimal properties defined. However, if this exists already `assemble` will be added to `devDependencies`.