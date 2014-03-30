Install `{%= name %}` globally:

```
npm install -g {%= name %}
```

Make a new directory, and `cd` into it:

```
mkdir my-new-project && cd $_
```

Run `yo {%= shortname(name) %}`, optionally passing a sub-generator name:

```
yo {%= shortname(name) %}:[name]
```

Run `grunt` to build the project!