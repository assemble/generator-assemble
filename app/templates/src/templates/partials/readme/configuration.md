### Helpers
[helper-lib](https://github.com/assemble/helper-lib/) is a massive collection of useful Handlebars helpers that can be used on any Handlebars project. As a convenience Assemble includes helper-lib as a dependency, so you can use any helper from that library in your templates.

> We also created some _custom helpers_ for this README example to demonstrate how easy it is to extend Assemble and without writing any Assemble-specific code:

#### \{{CHANGELOG}}
Usage: `\{{changelog}}` or `\{{changelog [path/to/file]}}`
Description: The "changelog" helper retrieves data from the **[CHANGELOG](CHANGELOG)** file in the root of the project, and then converts the changelog entries into a markdown formatted list of entries in the rendered README.md. Accepts a second optional parameter for specifying a different file than the default.

#### \{{ROADMAP}}
Usage: `\{{roadmap}}` or `\{{roadmap [path/to/file]}}`
Description: The "roadmap" helper is essentially the same as the "changelog" helper, except it retrieves data from the **[ROADMAP](ROADMAP)** file in the root of the project. This helper also accepts a second optional parameter for specifying a different file than the default.

#### \{{AUTHORS}}
Usage: `\{{authors}}` or `\{{authors [path/to/file]}}`
description: The "authors" helper retrieves data from the **[AUTHORS](AUTHORS)** file in the root of the project, and then converts each authors entry into markdown formatted links in the rendered README.md. Accepts a second optional parameter for specifying a different file than the default.