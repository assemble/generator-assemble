# assemble-examples

> A collection of example projects for working with [Assemble](https://github.com/assemble/)


## Getting Started

This repo provides an overview of some example projects for using Assemble. To get started:

* Visit one of the example projects
* **[Download this project][download]** and unzip it into a new folder.  
* In the project folder, run `npm install` to install [Assemble][assemble], [Grunt](http://gruntjs.com/) and any other dependencies.
* Once the dependencies are installed you may run `grunt assemble` to build the example project.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile][gruntfile], as well as install and use Grunt plugins. 



## Examples
Most of the example projects are pretty basic, and we try to incorporate examples for both templates and data in each project but you can get away with fewer files and less abstraction. 

#### [assemble-examples-basic](http://github.com/assemble/assemble-examples-basic) [![Build Status](https://travis-ci.org/assemble/assemble-examples-basic.png)](https://travis-ci.org/assemble/assemble-examples-basic)

> Assemble a basic site using:

* Layouts
* Pages
* Partials
* YAML Front-matter
* Markdown content


#### [assemble-examples-readme](http://github.com/assemble/assemble-examples-readme) [![Build Status](https://travis-ci.org/assemble/assemble-examples-readme.png)](https://travis-ci.org/assemble/assemble-examples-readme)

> Assemble a GitHub README.md, with very basic:

* `README.hbs` template
* Handlebars Helpers for changelog, authors and roadmap
* YAML data
* Markdown content



#### [assemble-examples-sitemap](http://github.com/assemble/assemble-examples-sitemap) [![Build Status](https://travis-ci.org/assemble/assemble-examples-sitemap.png)](https://travis-ci.org/assemble/assemble-examples-sitemap)

> Use Assemble to generate a Sitemap.xml from:

* `sitemap.hbs` template
* Example data



## Release History

 * 2013-04-24   v0.1.2   add assemble-examples-sitemap 
 * 2013-04-19   v0.1.1   add assemble-examples-readme 
 * 2013-04-19   v0.1.0   initial release


 
[assemble]: https://github.com/assemble/assemble/
[wiki]: https://github.com/assemble/assemble/wiki
[download]: https://github.com/assemble/assemble-examples-basic/archive/master.zip
[gruntfile]: http://gruntjs.com/sample-gruntfile
[configuring tasks]: http://gruntjs.com/configuring-tasks
[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically