
### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options following standard Grunt.js conventions:

```js
grunt.initConfig({

  // The 'assemble' task
  assemble: {
    options: {
      pkg: grunt.file.readJSON('package.json'),
      partials: 'src/content/*.hbs', // readme "sections"
      data: 'src/data/readme.yml', // extra metadata
      flatten: true,
      ext: ''
    },
    readme: {
      src:  'src/templates/README.md.hbs', // readme template
      dest: './'
    }
  }
})
```


### Options
Visit [Assemble's documentation][wiki] to learn about the available task and target options as well as how to configure them. Also, if are not yet familiar with Grunt.js, please consider visiting the Grunt documentation to learn more about [configuring tasks][configuring-tasks]. 

#### `flatten`
Type: `Boolean` (optional)
Default: `false`

Remove anything after (and including) the first "." in the destination path, then append this value. In other words, when they are are generated from different source folders this "flattens" them into the same destination directory. See [building the files object dynamically][files-object] for more information on files formats.


#### `layout`
Type: `String` (optional)
Default: `undefined`

If set, this defines the layout file to use for that [target][tasks-and-targets]. Unlike Jekyll, Assemble requires a file extension since you are not limited to using a single file type.

Learn more about [options.layouts][layouts]

#### `partials`
Type: `Object|Array` (optional)
Default: `undefined` 

Specifies the Handlebars [partials][] files, or paths to the directories of files to be used. 

Learn more about [options.partials][partials]

#### `assets`
Type: `String` (optional)
Default: `undefined`

Used with the `\{{assets}}` variable to resolve the relative path from the _dest file_ to the _assets_ folder.


#### `data`
Type: `Object|Array` (optional)
Default: `src/data`

Retrieves data from any specified `JSON` and/or `YAML` files to populate the templates when rendered. Data gets passed through the `data` object to the options on the assemble task, then to the context in your templates. 

Learn more about [data][data]

#### `ext`
Type: `String` (optional)
Default: `.html`

Specify the file extension for destination files.  In this example, we specify `ext: ''` in the `assemble` task options, which equates to "no extension". We do this because assemble only discards the last extension at build time, so by 1) telling assemble not to add another extension to the rendered tempaltes, and 2) by naming our template files with the "double" `.md.hbs` extension, we use a sort trick that tells Assemble to treat our markdown files like Handlebars templates. Result:

* We can use markdown for writing our content
* Any templates embedded in the markdown will be processed
* The dest files will have the `.md` extension

Note that you _can_ use the `.md` extension on `src` files, but Assemble will not process embedded templates since the `.md` extension is not "white-listed" for Handlebars templates. 

More info: 
* Learn more about [ext][options] options
* Learn more about processing [markdown][]


## Configuration

### Helpers
[helper-lib](https://github.com/assemble/helper-lib/) is a massive collection of useful Handlebars helpers that can be used on any Handlebars project. As a convenience Assemble includes helper-lib as a dependency, so you can use any helper from that library in your templates. 

We also created some _custom helpers_ for this README example to demonstrate how easy it is to extend Assemble and without writing any Assemble-specific code:

#### \{{CHANGELOG}}
Usage: `\{{changelog}}` or `\{{changelog [path/to/file]}}` 
Description: The "changelog" helper retrieves data from the **[CHANGELOG](CHANGELOG)** file in the root of the project, and then converts the changelog entries into a markdown formatted list of entries in the rendered README.md. Accepts a second optional parameter for specifying a different file than the default.

#### \{{ROADMAP}}
Usage: `\{{roadmap}}` or `\{{roadmap [path/to/file]}}` 
Description: The "roadmap" helper is essentially the same as the "changelog" helper, except it retrieves data from the **[ROADMAP](ROADMAP)** file in the root of the project. This helper also accepts a second optional parameter for specifying a different file than the default.

#### \{{AUTHORS}}
Usage: `\{{authors}}` or `\{{authors [path/to/file]}}` 
description: The "authors" helper retrieves data from the **[AUTHORS](AUTHORS)** file in the root of the project, and then converts each authors entry into markdown formatted links in the rendered README.md. Accepts a second optional parameter for specifying a different file than the default.



## Custom Variables
Values for the following variables are defined in the [readme.yml](./src/data/readme.yml) file. None of these are necessary, they are included for purposes of example. 


#### `readme.travis`
type: `Boolean`
default: `false`
Used in the README title to optionally include the [Travis CI](https://travis-ci.org/) badge. 

#### `readme.today`
type: `Boolean`
default: `false`
Formats "today's" date using the `\{{now}}` helper from [helper-lib](https://github.com/assemble/helper-lib/). 
See an example of using Lodash templates to accomplish the same thing, here: `./src/data/readme.yml`. 



