### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options following standard Grunt.js conventions:

  - README
  - Sitemap
  - Custom helper


### Options
Visit [Assemble's documentation][wiki] to learn about the available task and target options as well as how to configure them. Also, if are not yet familiar with Grunt.js, please consider visiting the Grunt documentation to learn more about [configuring tasks][configuring-tasks].


### Custom Variables
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



